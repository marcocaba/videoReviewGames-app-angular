import { Component } from '@angular/core';
import { Game } from '../models/Game';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  games: Array<Game> = [
    new Game(
      1,
      "The Legend of Zelda: Breath of the Wild",
      "An open-world action-adventure game set in the kingdom of Hyrule.",
      "2017-03-03",
      false,
      "https://www.nintendo.com/store/products/the-legend-of-zelda-breath-of-the-wild-switch/"
    ),
    new Game(
      2,
      "Cyberpunk 2077",
      "An open-world, action-adventure RPG set in the megalopolis of Night City.",
      "2020-12-10",
      false,
      "https://www.cyberpunk.net/"
    ),
    new Game(
      3,
      "Elden Ring",
      "A fantasy action RPG developed by FromSoftware and published by Bandai Namco Entertainment.",
      "2022-02-25",
      false,
      "https://www.eldenring.jp/"
    ),
    new Game(
      4,
      "Grand Theft Auto V",
      "An action-adventure game played from either a third-person or first-person perspective.",
      "2013-09-17",
      false,
      "https://www.rockstargames.com/gta-v"
    ),
    new Game(
      5,
      "Starfield",
      "A new sci-fi RPG from Bethesda Game Studios, the creators of Skyrim and Fallout 4.",
      "2023-09-06",
      false,
      "https://bethesda.net/en/game/starfield"
    ),
  ];


  


}
