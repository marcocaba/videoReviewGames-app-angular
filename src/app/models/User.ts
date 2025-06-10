import { Game } from "./Game";

export class User {
    idUser: number;
    name: string;
    psswd: string;
    favorites: Game[];

    constructor(idUser: number, name: string, psswd: string, favorites: Game[]) {
        this.idUser = idUser;
        this.name = name;
        this.psswd = psswd;
        this.favorites = favorites;
    }
}