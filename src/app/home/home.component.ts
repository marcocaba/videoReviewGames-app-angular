import { Component } from '@angular/core';
import { Game } from '../models/Game';
import { ApiServiceGamesService } from '../api-service-games.service';
import { GameDTO } from '../models/DTO/GameDTO';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  games: Array<GameDTO> = [];
  game: GameDTO = new GameDTO(0, "", "","","","",[],[])

  constructor(private apiServiceGames: ApiServiceGamesService) {
    this.apiServiceGames.getGamesByCreator().subscribe({
      next: response => {
        this.games = response.objectList;
      },
      error: error => {
        console.error(error);
      }
    });

    console.log(JSON.stringify(this.games))

  }

  


}
