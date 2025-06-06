import { Game } from "./Game";

export class Achievement {
    id: number;
    name: string;
    description: string;
    image: string;
    percent: string;
    game: Game;

    constructor(
        id: number,
        name: string,
        description: string,
        image: string,
        percent: string,
        game: Game
    ) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.image = image;
        this.percent = percent;
        this.game = game;
    }
}