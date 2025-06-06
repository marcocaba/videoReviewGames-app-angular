import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { GameDTO } from '../models/DTO/GameDTO';
import { ApiServiceGamesService } from '../api-service-games.service';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-games',
  standalone: true,
  imports: [NgFor, FormsModule, NgIf],
  templateUrl: './games.component.html',
  styleUrl: './games.component.scss'
})
export class GamesComponent {
  games: Array<GameDTO> = [];
  totalPages: number = 0;
  currentPage: number = 0;
  mainImage: string = "";

  constructor(private apiServiceGames: ApiServiceGamesService) {
    this.getGamesDTO();
  }

  calculateTotalPages(totalItems: number) {
    this.totalPages = Math.ceil((totalItems / 20));
  }

  changePage(currentPage: number) {
    this.currentPage = currentPage;
    this.getGamesDTO();
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

  getGamesDTO() {
    this.apiServiceGames.getGamesDTO(this.currentPage).subscribe({
      next: response => {
        this.games = response.objectList;
        this.calculateTotalPages(response.sizeList);
        console.log(JSON.stringify(this.games))
      },
      error: error => {
        console.error(error);
      }
    })
  }

}
