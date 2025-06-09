export class Review {
    id: number;
    idUser: number;
    idGame: number;
    text: string;
    score: number;

    constructor(id: number, idUser: number, idGame: number, text: string, score: number) {
        this.id = id;
        this.idUser = idUser;
        this.idGame = idGame;
        this.text = text;
        this.score = score;
    }
}