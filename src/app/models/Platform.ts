import { Game } from "./Game";

export class Platform {
    id: number;
    slug: string;
    name: string;

    constructor(id: number, slug: string, name: string) {
        this.id = id;
        this.slug = slug;
        this.name = name;
    }
}
