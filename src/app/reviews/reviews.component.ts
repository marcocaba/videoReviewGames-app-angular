import { Location, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { Game } from '../models/Game';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiServiceReviewsService } from '../api-service-reviews.service';
import { ApiServiceUsersService } from '../api-service-users.service';
import { ApiServiceGamesService } from '../api-service-games.service';
import { Review } from '../models/Review';
import { error } from 'console';
import { User } from '../models/User';
import { response } from 'express';

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [NgIf, NgFor],
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.scss'
})
export class ReviewsComponent {

  games: Array<Game> = []
  idUser: any;
  reviews: Array<Review> = [];
  user: User = new User(0, "", "", []);
  gamesList: Game[] = [];

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
  const gameIds = Array.from(new Set(reviews.map(r => r.idGame))); // IDs únicos

  gameIds.forEach(idGame => {
    this.apiServiceGames.getGameById(idGame).subscribe({
      next: (game) => {
        this.gamesList.push(game);
        console.log(game)
      },
      error: (error) => {
        console.error(`Error cargando juego con id ${idGame}:`, error);
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

  nameGame(idGame: any): string {
    let games: Array<Game> = this.gamesList;
    console.log(idGame)
    for(let i:number = 0; i < games.length; i++) {
      if(games[i].id === idGame) {
        return games[i].name;
      }
    }
    return 'Juego no encontrado';
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


}
