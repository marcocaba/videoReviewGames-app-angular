import { Game } from "./Game";

export class Platform {
    id: number;
    slug: string;
    name: string;
    url: string;

    constructor(id: number, slug: string, name: string, url:string) {
        this.id = id;
        this.slug = slug;
        this.name = name;
        this.url = url;
    }
}
