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


  constructor(private apiServiceGames: ApiServiceGamesService) {
    // this.apiServiceGames.getAllGames().subscribe({
    //   next: response => {
    //     this.games = response;
    //   },
    //   error: error => {
    //     console.error(error);
    //   }
    // });

  }

  


}
