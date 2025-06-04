import { Game } from "./Game";

export class Genre {
    id: number;
    name: string;
    games: Game[];

    constructor(id: number, name: string, games: Game[]) {
        this.id = id;
        this.name = name;
        this.games = games;
    }
}