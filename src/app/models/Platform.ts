import { Game } from "./Game";

export class Platform {
    id: number;
    slug: string;
    name: string;
    games: Game[];

    constructor(id: number, slug: string, name: string, games: Game[]) {
        this.id = id;
        this.slug = slug;
        this.name = name;
        this.games = games;
    }
}