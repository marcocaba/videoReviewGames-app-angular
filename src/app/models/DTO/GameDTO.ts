import { Creator } from "../Creator";
import { Tag } from "../Tag";

export class GameDTO {
    id: number;
    name: string;
    description: string;
    released: string;
    image: string;
    imageSecond: string;
    tags: Tag[];
    creators: Creator[];

    constructor(id: number, name: string, description: string, released: string, image: string, imageSecond: string, tags: Tag[], creators: Creator[]) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.released = released;
        this.image = image;
        this.imageSecond = imageSecond;
        this.tags = tags;
        this.creators = creators;
    }
}
