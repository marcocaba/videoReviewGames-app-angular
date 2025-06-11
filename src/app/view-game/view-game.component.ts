import { CommonModule, Location, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ApiServiceGamesService } from '../api-service-games.service';
import { ActivatedRoute, Router, NavigationEnd, RouterModule } from '@angular/router';
import { Game } from '../models/Game';
import { filter } from 'rxjs/operators';
import { ApiServiceReviewsService } from '../api-service-reviews.service';
import { Review } from '../models/Review';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-view-game',
  standalone: true,
  imports: [NgFor, CommonModule, NgFor, FormsModule, NgIf, ReactiveFormsModule, RouterModule],
  templateUrl: './view-game.component.html',
  styleUrl: './view-game.component.scss'
})
export class ViewGameComponent implements OnInit {
  idGame: any;
  game: Game = new Game(0, "", "", "", [], [], [], [], [], [], "");
  gamesLike: Array<Game> = [];
  review: Review = new Review(0, 0, 0, "", 0);
  reviews: Array<Review> = [];
  newReview: Review = new Review(0, 0, 0, "", 0);
  score: number = 0;

  constructor(
    private apiServiceGames: ApiServiceGamesService,
    private apiServiceReviews: ApiServiceReviewsService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.loadGameData();
    });

    this.idGame = Number(this.route.snapshot.paramMap.get('idGame'));
  }

  ngOnInit() {
    this.loadGameData();
  }

  loadGameData() {
    this.idGame = this.route.snapshot.paramMap.get('idGame');
    this.newReview = new Review(0,0,0,"",0);
    this.newReview.idGame = this.idGame;
    this.newReview.idUser = 2;
    if (this.idGame) {
      this.apiServiceGames.getGameById(this.idGame).subscribe({
        next: response => {
          this.game = response;
          if (this.game.genres && this.game.genres.length > 0) {
            this.apiServiceGames.getGameByGenre(this.game.genres[0].id, 1).subscribe({
              next: response => {
                const listGames = response.objectList;
                this.gamesLike = this.getRandomGames(listGames, 5);
              },
              error: error => {
                console.error("Error fetching games by genre:", error);
              }
            });
          } else {
            this.gamesLike = [];
          }
        },
        error: error => {
          console.error("Error fetching game by ID:", error);
          this.router.navigate(['/404']);
        }
      });

      this.apiServiceReviews.getReviewsByGame(this.idGame, 0).subscribe({
        next: response => {
          console.log(this.idGame)
          this.reviews = response.objectList;
          console.log(response.objectList)
          this.getRadomReview();
        },
        error: error => {
          console.error(error);
        }
      })

    } else {
      console.error("No idGame found in route parameters.");
      this.router.navigate(['/games']);
    }
  }

  getRandomGames<T>(listGames: T[], count: number): T[] {
    const random = listGames.slice().sort(() => 0.5 - Math.random());
    return random.slice(0, count);
  }

  cleanAndTruncateHtml(rawText: string, wordLimit: number = 100): string {
    if (!rawText) return '';

    let text = rawText.replace(/<br\s*\/?>/gi, '\n');
    text = text.replace(/<li>/gi, '• ');
    text = text.replace(/<\/li>/gi, '\n');
    text = text.replace(/<\/?ul>/gi, '\n');
    text = text.replace(/<[^>]*>/g, '');
    text = text.replace(/\n{3,}/g, '\n\n').trim();

    const words = text.split(/\s+/);
    if (words.length <= wordLimit) {
      return text;
    } else {
      return words.slice(0, wordLimit).join(' ') + '...';
    }
  }

  getRadomReview(): void {
    if (this.reviews && this.reviews.length > 0) {
      const randomIndex = Math.floor(Math.random() * this.reviews.length);
      this.review = this.reviews[randomIndex];
    } else {
      this.review = new Review(0, 0, 0, "", 0);
    }
  }

  verJuego(idGame: any) {
    this.router.navigate(['/viewGame/' + idGame]);
  }

  addReview() {
    this.apiServiceReviews.addReview(this.newReview).subscribe({
      next: response => {
        if (response == 'reviewAdded') {
          alert('Review añadida con exito')

        } else if (response == "contains") {
          alert('Ya has escrito una review de ' + this.game.name)
        } else if (response == "needLogIn") {
          alert("Para añadir una review inicia sesión")
        }
      },
      error: error => {
        console.log(error);
      }
    })
    this.newReview = new Review(0, 0, 0, "", 0);
    this.loadGameData();
    this.getRadomReview();
  }

  setScore(score: number) {
    this.newReview.score = score;
  }


  verReview(idGame: any) {
    this.router.navigate(['/viewReview/' + idGame]);
  }

  back() {
    this.location.back();
  }

   calcularMedias(reviews: Array<Review>): number {
    let media: number = 0;
    for (let r of reviews) {
      media = media + r.score;
    }
    media = media / reviews.length;
    return media;
  }

  addGameToFavorites() {
    this.apiServiceGames.addGameToFavorites(this.game.id).subscribe({
      next: response => {
        console.log(response)
        if (response == "gameAdded") {
          alert(this.game.name + " añadido a tu lista de favoritos")

        } else if (response == "empty") {
          alert("Lamentablemente no está disponible el juego para ser añadido a la lista de favoritos")

        } else if (response == "contains") {
          alert(this.game.name + " ya se encuentra en tu lista de favoritos")

        } else if (response == "needLogIn") {
          alert("Para añadir un juego a tu lista de favoritos inicia sesión")
        }
      },
      error: error => {
        console.error(error);
      }
    })
  }

}