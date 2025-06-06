import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Game } from './models/Game';
import { GameDTO } from './models/DTO/GameDTO';
import { ObjectPage } from './models/DTO/ObjectPage';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceGamesService {

  url: string = "http://localhost:8080";

  constructor(private http: HttpClient) { }

  getNewestGames(): Observable<GameDTO[]> {
    return this.http.get<GameDTO[]>(this.url + "/viewNewestGamesDTO")
  }

  getCarouselGames(): Observable<GameDTO[]> {
    return this.http.get<GameDTO[]>(this.url + "/viewCarouselGamesDTO")
  }

  getGamesDTO(page:number): Observable<ObjectPage> {
    let params = new HttpParams().set('page', page)
    return this.http.get<ObjectPage>(this.url + '/viewGamesDTO', {'params': params})
  }
}
