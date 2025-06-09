import { Game } from "./Game";

export class Screenshot {
    id: number;
    url: string;
    image: string;
    game: Game;
    
    constructor(id: number, url: string, image: string, game: Game) {
        this.id = id;
        this.url = url;
        this.image = image;
        this.game = game;
    }
}