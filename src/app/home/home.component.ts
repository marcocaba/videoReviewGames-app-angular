import { Component } from '@angular/core';
import { Game } from '../models/Game';
import { ApiServiceGamesService } from '../api-service-games.service';
import { GameDTO } from '../models/DTO/GameDTO';
import { NgFor } from '@angular/common';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor,CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  newGames: Array<GameDTO> = new Array<GameDTO>();
  topGames:Array<GameDTO> = new Array<GameDTO>();
  carouselGames:Array<GameDTO> = new Array<GameDTO>();

  game: Game = new Game(0,"","","",[],[], [], [], [], [], "")

  constructor(private apiServiceGames: ApiServiceGamesService) {
    this.getNewGames();
    this.getCarouselGames();
  }

  getNewGames(){
     this.apiServiceGames.getNewestGames().subscribe({
      next: response => {
        this.newGames = response;
      },
      error: error => {
        console.error(error);
      }
    });
  }

    getCarouselGames(){
     this.apiServiceGames.getCarouselGames().subscribe({
      next: response => {
        this.carouselGames = response;
        console.log(JSON.stringify(this.carouselGames))
      },
      error: error => {
        console.error(error);
      }
    });
  }

}
