import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { GameDTO } from '../models/DTO/GameDTO';
import { ApiServiceGamesService } from '../api-service-games.service';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router, RouterModule } from '@angular/router';
import { routes } from '../app.routes';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [NgFor, FormsModule, NgIf, ReactiveFormsModule, RouterModule],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss'
})
export class FavoritesComponent {
  games: Array<GameDTO> = [];
  totalPages: number = 0;
  currentPage: number = 0;

  constructor(private apiServiceGames: ApiServiceGamesService, private router: Router) {
    this.getFavoriteGamesById();
  }

  calculateTotalPages(totalItems: number) {
    this.totalPages = Math.ceil((totalItems / 20));
  }

  changePage(currentPage: number) {
    this.currentPage = currentPage;
    this.getFavoriteGamesById();
  }

  previousPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.changePage(this.currentPage);
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.changePage(this.currentPage);
    }
  }

  cleanAndTruncateHtml(rawText: string, wordLimit: number = 100): string {
    if (!rawText) return '';

    let text = rawText.replace(/<br\s*\/?>/gi, '\n');

    text = text.replace(/<li>/gi, '� ');
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

  getFavoriteGamesById() {
    this.apiServiceGames.getFavoriteGamesById(3, this.currentPage).subscribe({
      next: response => {
        this.games = response.objectList;
        this.calculateTotalPages(response.sizeList);
      },
      error: error => {
        console.error(error);
      }
    })
  }

  removeGameFromFavorites(game: GameDTO) {
    let confirmed = confirm(`¿Estás seguro de que quieres eliminar "${game.name}" de tu lista de favoritos?`);
    if (!confirmed) {
      return;
    }

    this.apiServiceGames.removeGameFromFavorites(3, game.id).subscribe({
      next: response => {
        console.log(response)
        if (response == "gameRemoved") {
          alert(game.name + " eliminado de tu lista de favoritos")
          this.getFavoriteGamesById();
        } else if (response == "empty") {
          alert("Lamentablemente no se encuentra el juego para ser eliminado")
        } else if (response == "notFound") {
          alert(game.name + " ya se encuentra eliminado de tu lista de favoritos")
        }
      },
      error: error => {
        console.error(error);
      }
    })
  }

  viewGame(idGame: number) {
    this.router.navigate(['/viewGame/' + idGame]);
  }
}
