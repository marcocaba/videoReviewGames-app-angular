export class GameDTO {
    id: number;
    name: string;
    description: string;
    released: string;
    image: string;

    constructor(id: number, name: string, description: string, released: string, image: string) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.released = released;
        this.image = image;
    }
}