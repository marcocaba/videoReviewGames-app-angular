import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Game } from './models/Game';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceGamesService {

  url: string = "http://localhost:8080";

  constructor(private http: HttpClient) { }

  getAllGames(): Observable<Game[]> {
    return this.http.get<Game[]>(this.url + "/viewFewGames");
  }

  getGamesByCreator(): Observable<Game[]> {
    let params = new HttpParams()
      .set('idCreator', 10)
      .set('page', 1)
      .set('size', 4)
    return this.http.get<Game[]>(this.url + "/viewGamesByCreator", {'params': params})
  }

}
