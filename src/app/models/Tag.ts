import { Game } from "./Game";

export class Tag {
    id: number;
    name: string;
    games: Game[];

    constructor(id: number, name: string, games: Game[]) {
        this.id = id;
        this.name = name;
        this.games = games;
    }
}