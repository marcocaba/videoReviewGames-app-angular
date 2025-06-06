import { Game } from "./Game";

export class Screenshot {
    id: number;
    image: string;
    game: Game;
    
    constructor(id: number, image: string, game: Game) {
        this.id = id;
        this.image = image;
        this.game = game;
    }
}