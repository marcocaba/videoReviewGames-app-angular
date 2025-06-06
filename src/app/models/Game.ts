import { Achievement } from "./Achievement";
import { Creator } from "./Creator";
import { Genre } from "./Genre";
import { Platform } from "./Platform";
import { Screenshot } from "./Screenshot";
import { Tag } from "./Tag";

export class Game {
    id: number;
    name: string;
    description: string;
    released: string;
    platforms: Platform[];
    achievements: Achievement[];
    screenshots: Screenshot[];
    creators: Creator[];
    genres: Genre[];
    tags: Tag[];
    image: string;

    constructor(
        id: number,
        name: string,
        description: string,
        released: string,
        platforms: Platform[],
        achievements: Achievement[],
        screenshots: Screenshot[],
        creators: Creator[],
        genres: Genre[],
        tags: Tag[],
        image: string
    ) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.released = released;
        this.platforms = platforms;
        this.achievements = achievements;
        this.screenshots = screenshots;
        this.creators = creators;
        this.genres = genres;
        this.tags = tags;
        this.image = image;
    }
}