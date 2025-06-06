import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { GameDTO } from '../models/DTO/GameDTO';
import { ApiServiceGamesService } from '../api-service-games.service';
import { response } from 'express';
import { error } from 'console';

@Component({
  selector: 'app-games',
  standalone: true,
  imports: [NgFor],
  templateUrl: './games.component.html',
  styleUrl: './games.component.scss'
})
export class GamesComponent {
  games: Array<GameDTO> = [];

  constructor(private apiServiceGames: ApiServiceGamesService) {
    this.apiServiceGames.getGamesDTO().subscribe({
      next: response => {
        this.games = response.objectList;
        console.log(this.games[0].creators[0])
        console.log(this.games[0].tags[0])
      },
      error: error => {
        console.error(error);
      }
    })
  }


  cleanAndTruncateHtml(rawText: string, wordLimit: number = 100): string {
  if (!rawText) return '';

  let text = rawText.replace(/<br\s*\/?>/gi, '\n');

  text = text.replace(/<li>/gi, '• ');
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


}
