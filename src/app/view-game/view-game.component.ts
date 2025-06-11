import { CommonModule, Location, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ApiServiceGamesService } from '../api-service-games.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Game } from '../models/Game';
import { filter } from 'rxjs/operators';
import { RouterModule } from '@angular/router';
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

    this.idGame = Number(this.route.snapshot.paramMap.get('idGame'));
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
    return words.join(' ');

  }

  addGameToFavorites() {
    this.apiServiceGames.addGameToFavorites(3, this.game.id).subscribe({
      next: response => {
        console.log(response)
        if (response == "gameAdded") {
          alert(this.game.name + " añadido a tu lista de favoritos")
        } else if (response == "empty") {
          alert("Lamentablemente no está disponible el juego para ser añadido a la lista de favoritos")
        } else if (response == "contains") {
          alert(this.game.name + " ya se encuentra en tu lista de favoritos")
        }
      },
      error: error => {
        console.error(error);
      }
    })
  }

  verJuego(idGame: any) {
    this.router.navigate(['/viewGame/' + idGame]);
  }
}