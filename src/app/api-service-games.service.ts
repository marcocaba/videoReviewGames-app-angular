import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Game } from './models/Game';
import { ObjectPage } from './models/DTO/ObjectPage';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceGamesService {

  url: string = "http://localhost:8080";

  constructor(private http: HttpClient) { }

  getAllGames(): Observable<Game[]> {
    return this.http.get<Game[]>(this.url + "/viewFewGames");
  }

  getGamesByCreator(): Observable<ObjectPage> {
    let params = new HttpParams()
      .set('idCreator', 10)
      .set('page', 20)
    return this.http.get<ObjectPage>(this.url + "/viewGamesByCreator", {'params': params})
  }
  
  getGamesDTO(): Observable<ObjectPage> {
    let params = new HttpParams().set('page', 20)
    return this.http.get<ObjectPage>(this.url + '/viewGamesDTO', {'params': params})
  }

}
