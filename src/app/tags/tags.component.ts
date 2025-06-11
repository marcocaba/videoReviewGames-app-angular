import { Component } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { GameDTO } from '../models/DTO/GameDTO';
import { ApiServiceGamesService } from '../api-service-games.service';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Tag } from '../models/Tag';

@Component({
  selector: 'app-tags',
  standalone: true,
  imports: [NgFor, FormsModule, NgIf, ReactiveFormsModule, RouterModule, CommonModule],
  templateUrl: './tags.component.html',
  styleUrl: './tags.component.scss'
})
export class TagsComponent {
  games: Array<GameDTO> = [];
  totalPages: number = 0;
  currentPage: number = 0;
  mainImage: string = "";
  searchControl = new FormControl('');
  tagId: number = 0;
  tag!: Tag;

  constructor(private apiServiceGames: ApiServiceGamesService, private route: ActivatedRoute, private router: Router) {
    this.tagId = Number(this.route.snapshot.paramMap.get('tagsId'));
    this.getGamesByTag();
    this.getTagById();
  }

  calculateTotalPages(totalItems: number) {
    this.totalPages = Math.ceil((totalItems / 20));
  }

  changePage(currentPage: number) {
    this.currentPage = currentPage;
    this.getGamesByTag();
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

  getGamesByTag() {
    this.apiServiceGames.getGamesByTag(this.tagId, this.currentPage).subscribe({
      next: response => {
        this.games = response.objectList;
        this.calculateTotalPages(response.sizeList);
      },
      error: error => {
        console.error(error);
      }
    })
  }

  getTagById() {
    this.apiServiceGames.getTagById(this.tagId).subscribe({
      next: response => {
        this.tag = response;
      },
      error: error => {
        console.error(error);
      }
    })
  }

  viewGame(idGame: number) {
    console.log(idGame)
    this.router.navigate(['/viewGame/' + idGame]);
  }
}
