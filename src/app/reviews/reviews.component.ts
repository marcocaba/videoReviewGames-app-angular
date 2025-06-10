import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { Game } from '../models/Game';

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [NgIf, NgFor],
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.scss'
})
export class ReviewsComponent {

  game: Game = new Game(0, "", "", "", [], [], [], [], [], [], "");
  games: Array<Game> = []

  viewGame(idGame: any) {

  }

}
