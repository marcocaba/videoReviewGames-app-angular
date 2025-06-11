import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { ApiServiceGamesService } from '../api-service-games.service';
import { GameDTO } from '../models/DTO/GameDTO';
import { NgFor } from '@angular/common';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

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

  constructor(private apiServiceGames: ApiServiceGamesService, @Inject(PLATFORM_ID) private platformId: Object) {
    this.getNewGames();
    this.getCarouselGames();
    this.carouselCount = 0;
    this.carouselGameActive = this.carouselGames[0];
    this.getBestGames();

  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      if (!sessionStorage.getItem('reloaded')) {
        sessionStorage.setItem('reloaded', 'true');
        window.location.reload();
      } else {
        sessionStorage.removeItem('reloaded');
      }
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

  getBestGames() {
    this.apiServiceGames.getFourBestGames().subscribe({
      next: response => {
        this.topGames = response;
      },
      error: error => {
        console.error(error);
      }
    });
  }

  addGameToFavorites(game: GameDTO) {
    this.apiServiceGames.addGameToFavorites(game.id).subscribe({
      next: response => {
        console.log(response)
        if (response == "gameAdded") {
          alert(game.name + " añadido a tu lista de favoritos")

        } else if (response == "empty") {
          alert("Lamentablemente no está disponible el juego para ser añadido a la lista de favoritos")

        } else if (response == "contains") {
          alert(game.name + " ya se encuentra en tu lista de favoritos")

        } else if (response == "needLogIn") {
          alert("Para añadir un juego a tu lista de favoritos inicia sesión")
        }
      },
      error: error => {
        console.error(error);
      }
    })
  }

}
