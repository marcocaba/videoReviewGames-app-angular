import { Component } from '@angular/core';
import { Game } from '../models/Game';
import { ApiServiceGamesService } from '../api-service-games.service';
import { GameDTO } from '../models/DTO/GameDTO';
import { NgFor, NgIf } from '@angular/common';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor, CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  newGames: Array<GameDTO> = new Array<GameDTO>();
  topGames: Array<GameDTO> = new Array<GameDTO>();
  carouselGames: Array<GameDTO> = new Array<GameDTO>();
  carouselGameActive: GameDTO | undefined;
  carouselCount: number = 0;

  constructor(private apiServiceGames: ApiServiceGamesService) {
    this.getNewGames();
    this.getCarouselGames();
    this.carouselCount = 0;
    this.carouselGameActive = this.carouselGames[0];


  }

  ngOnInit() {
    if (!sessionStorage.getItem('reloaded')) {
      sessionStorage.setItem('reloaded', 'true');
      window.location.reload();
    } else {
      sessionStorage.removeItem('reloaded'); // opcional, para que funcione la próxima vez que entres
    }
  }

  showGame(idGame: any) {
    alert(idGame)
  }

  addFavorites(idGame: any) {
    alert(idGame)
  }

  previousSlide() {
    if (this.carouselCount > 0) {
      this.carouselCount = this.carouselCount - 1;
    } else {
      this.carouselCount = 3;
    }

    this.carouselGameActive = this.carouselGames[this.carouselCount]
  }

  nextSlide() {
    if (this.carouselCount < 3) {
      this.carouselCount = this.carouselCount + 1;
    } else {
      this.carouselCount = 0;
    }

    this.carouselGameActive = this.carouselGames[this.carouselCount]
  }

  getNewGames() {
    this.apiServiceGames.getNewestGames().subscribe({
      next: response => {
        this.newGames = response;
      },
      error: error => {
        console.error(error);
      }
    });
  }

  getCarouselGames() {
    this.apiServiceGames.getCarouselGames().subscribe({
      next: response => {
        this.carouselGames = response;
      },
      error: error => {
        console.error(error);
      }
    });
  }

}
