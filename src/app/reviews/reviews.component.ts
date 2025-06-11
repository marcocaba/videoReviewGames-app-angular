import { Location, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { Game } from '../models/Game';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiServiceReviewsService } from '../api-service-reviews.service';
import { ApiServiceUsersService } from '../api-service-users.service';
import { ApiServiceGamesService } from '../api-service-games.service';
import { Review } from '../models/Review';
import { User } from '../models/User';
import { FormsModule } from '@angular/forms';

declare var bootstrap: any;

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [NgIf, NgFor, FormsModule],
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.scss'
})

export class ReviewsComponent {

  games: Array<Game> = []
  idUser: any;
  reviews: Array<Review> = [];
  user: User = new User(0, "", "", []);
  gamesList: Game[] = [];
  reviewGameMap = new Map<number, any>();
  selectedReview: Review = new Review(0, 0, 0, "", 0);
  updated: boolean = false;

  constructor(
    private apiServiceGames: ApiServiceGamesService,
    private apiServiceReviews: ApiServiceReviewsService,
    private apiServiceUser: ApiServiceUsersService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {
    this.idUser = this.route.snapshot.paramMap.get('idUser');
    this.loadReviews(this.idUser);
    this.loadUser(this.idUser);
  }

  loadGamesFromReviews(reviews: Review[]) {

    reviews.forEach(review => {
      this.apiServiceGames.getGameById(review.idGame).subscribe({
        next: (game) => {
          this.reviewGameMap.set(review.id, game);
        },
        error: (error) => {
          console.error(`Error cargando juego con id ${review.idGame}:`, error);
        }
      });
    });
  }

  loadReviews(idUser: any) {
    this.apiServiceReviews.viewReviewsUser(idUser, 0).subscribe({
      next: response => {
        this.reviews = response.objectList;
        this.loadGamesFromReviews(response.objectList);
      },
      error: error => {
        console.error(error);
      }
    });
  }

  getGameForReview(idReview: number): Game | undefined {
    return this.reviewGameMap.get(idReview);
  }

  loadUser(idUser: any) {
    this.apiServiceUser.getUserById(idUser).subscribe({
      next: response => {
        this.user = response;
      },
      error: error => {
        console.error(error);
      }
    })
  }

  verReview(idGame: any) {
    this.router.navigate(['/viewReview/' + idGame]);
  }

  back() {
    this.location.back();
  }

  viewGame(idGame: number) {
    console.log(idGame)
    this.router.navigate(['/viewGame/' + idGame]);
  }
  onEditReview(review: Review): void {
    this.selectedReview = review;
    const modalElement = document.getElementById('editReview');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  saveReview(): void {
    if (this.selectedReview.score > 0 && this.selectedReview.score < 5) {
      this.apiServiceReviews.updateReview(this.selectedReview).subscribe({
        next: response => {
          this.updated = response;

        },
        error: error => {
          console.error(error);
        }
      })

      const modalElement = document.getElementById('editReview');
      if (modalElement) {
        const modal = bootstrap.Modal.getInstance(modalElement);
        modal.hide();
      }
    } else {
      alert("La nota no puede ser mas de 5 ni menos de 0")
      this.loadReviews(this.idUser);
    }

  }

  onDeleteReview(review: Review): void {
    this.apiServiceReviews.removeReview(review.idGame).subscribe({
      next: response => {
        window.location.reload();
        if (response == "reviewRemoved") {
          this.loadReviews(this.idUser);
        } else if (response == "needLogIn") {
          alert("Se necesita inicio de sesion")
        } else if (response == "reviewNotFound") {
          alert("error con la eliminacion")
        }
      },
      error: error => {
        console.error(error);
      }
    })
  }

}
