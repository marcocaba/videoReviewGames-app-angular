import { Component } from '@angular/core';
import { ApiServiceReviewsService } from '../api-service-reviews.service';
import { ApiServiceGamesService } from '../api-service-games.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location, NgFor, NgIf } from '@angular/common';
import { response } from 'express';
import { error } from 'console';
import { Game } from '../models/Game';
import { Review } from '../models/Review';
import { ApiServiceUsersService } from '../api-service-users.service';

@Component({
  selector: 'app-view-review',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './view-review.component.html',
  styleUrl: './view-review.component.scss'
})
export class ViewReviewComponent {
  idGame: any;
  game: Game = new Game(0, "", "", "", [], [], [], [], [], [], "");
  reviews: Array<Review> = [];

  constructor(
    private apiServiceGames: ApiServiceGamesService,
    private apiServiceReviews: ApiServiceReviewsService,
    private apiServiceUser: ApiServiceUsersService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {
    this.idGame = this.route.snapshot.paramMap.get('idGame');
    this.loadGame(this.idGame);
    this.loadReviews(this.idGame);
  }

  loadGame(idGame: any) {
    this.apiServiceGames.getGameById(idGame).subscribe({
      next: response => {
        this.game = response;
      },
      error: error => {
        console.error(error);
      }
    });
  }

  loadReviews(idGame: any) {
    this.apiServiceReviews.getReviewsByGame(idGame, 0).subscribe({
      next: response => {
        this.reviews = response.objectList;
      },
      error: error => {
        console.error(error);
      }
    });
  }

  calcularMedias(reviews: Array<Review>): number {
    let media: number = 0;
    for (let r of reviews) {
      media = media + r.score;
    }
    media = media / reviews.length;
    return media;
  }


  back() {
    this.location.back();
  }
}
