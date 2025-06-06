import { Component } from '@angular/core';
import { Game } from '../models/Game';
import { ApiServiceGamesService } from '../api-service-games.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  games: Array<Game> = [];
  game: Game = new Game(0,"","","",[],[], [], [], [], [], "")

  constructor(private apiServiceGames: ApiServiceGamesService) {
    this.apiServiceGames.getGamesByCreator().subscribe({
      next: response => {
        this.games = response;
        this.game = this.games[0];
      },
      error: error => {
        console.error(error);
      }
    });

    console.log(JSON.stringify(this.games))

  }

  


}
