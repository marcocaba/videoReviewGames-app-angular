import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { GameDTO } from '../models/DTO/GameDTO';
import { ApiServiceGamesService } from '../api-service-games.service';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-games',
  standalone: true,
  imports: [NgFor, FormsModule, NgIf, ReactiveFormsModule, RouterModule],
  templateUrl: './games.component.html',
  styleUrl: './games.component.scss'
})
export class GamesComponent {
  games: Array<GameDTO> = [];
  totalPages: number = 0;
  currentPage: number = 0;
  searchControl = new FormControl('');

  constructor(private apiServiceGames: ApiServiceGamesService, private router: Router) {
    this.getGamesDTO();

    this.searchControl.valueChanges
      .pipe(
        debounceTime(300),
        switchMap(value => {
          const query = value?.trim() ?? '';

          if (query.length === 0) {
            this.getGamesDTO();
            return of([]);
          }

          return this.apiServiceGames.getGameSearcher(query);
        })
      )
      .subscribe(results => {
        console.log('Resultados del buscador:', results);
        if (results.length > 0) {
          this.games = results;
          this.totalPages = 0;
          this.currentPage = 0;
        }
      });
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
