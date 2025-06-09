import { CommonModule, Location, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ApiServiceGamesService } from '../api-service-games.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Game } from '../models/Game';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-view-game',
  standalone: true,
  imports: [NgFor, CommonModule],
  templateUrl: './view-game.component.html',
  styleUrl: './view-game.component.scss'
})
export class ViewGameComponent implements OnInit {

  idGame: any;
  game: Game = new Game(0, "", "", "", [], [], [], [], [], [], "");
  gamesLike: Array<Game> = [];

  constructor(
    private apiServiceGames: ApiServiceGamesService,
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

  ngOnInit(): void {
    this.loadGameData();
  }

  private loadGameData(): void {
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
}