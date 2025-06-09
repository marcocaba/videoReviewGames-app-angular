import { CommonModule, Location, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ApiServiceGamesService } from '../api-service-games.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Game } from '../models/Game';
import { filter } from 'rxjs/operators';
import { ApiServiceReviewsService } from '../api-service-reviews.service';
import { Review } from '../models/Review';
import { response } from 'express';
import { error } from 'console';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-view-game',
  standalone: true,
  imports: [NgFor, CommonModule, FormsModule],
  templateUrl: './view-game.component.html',
  styleUrl: './view-game.component.scss'
})
export class ViewGameComponent implements OnInit {

  idGame: any;
  game: Game = new Game(0, "", "", "", [], [], [], [], [], [], "");
  gamesLike: Array<Game> = [];
  reviews: Array<Review> = [];
  newReview: Review = new Review(0,0,0,"",0)

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
  }

  ngOnInit() {
    this.loadGameData();
  }

  loadGameData() {
    this.idGame = this.route.snapshot.paramMap.get('idGame');
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

      this.apiServiceReviews.getReviewsByGame(this.idGame, 1).subscribe({
        next: response => {
          this.reviews = response.objectList;
          console.log(this.reviews)
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

  verJuego(idGame: any) {
    this.router.navigate(['/viewGame/' + idGame]);
  }

  addReview() {
    this.router.navigate(['/addReview/']);
  }

  back() {
    this.location.back();
  }


}