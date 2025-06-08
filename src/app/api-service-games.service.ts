import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Game } from './models/Game';
import { GameDTO } from './models/DTO/GameDTO';
import { ObjectPage } from './models/DTO/ObjectPage';
import { Creator } from './models/Creator';
import { Tag } from './models/Tag';
import { Platform } from './models/Platform';

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

  getGamesDTO(page: number): Observable<ObjectPage> {
    let params = new HttpParams().set('page', page)
    return this.http.get<ObjectPage>(this.url + '/viewGamesDTO', { 'params': params })
  }

  getGameSearcher(gameName: string): Observable<GameDTO[]> {
    let params = new HttpParams().set('gameName', gameName)
    return this.http.get<GameDTO[]>(this.url + "/gameSearch", { 'params': params })
  }

  getGamesByCreator(idCreator: number, page: number): Observable<ObjectPage> {
    let params = new HttpParams()
      .set('idCreator', idCreator)
      .set('page', page);
    return this.http.get<ObjectPage>(this.url + "/viewGamesByCreator", { params });
  }

  getCreatorById(idCreator: number): Observable<Creator> {
    let params = new HttpParams().set('idCreator', idCreator)
    return this.http.get<Creator>(this.url + "/getCreatorById", { 'params': params })
  }

  getGamesByTag(idTag: number, page: number): Observable<ObjectPage> {
    let params = new HttpParams()
      .set('idTag', idTag)
      .set('page', page);
    return this.http.get<ObjectPage>(this.url + "/viewGamesByTag", { params });
  }

  getTagById(idTag: number): Observable<Tag> {
    let params = new HttpParams().set('idTag', idTag)
    return this.http.get<Tag>(this.url + "/getTagById", { 'params': params })
  }

  getGamesByPlatform(idPlatform: number, page: number): Observable<ObjectPage> {
    let params = new HttpParams()
      .set('idPlatform', idPlatform)
      .set('page', page);
    return this.http.get<ObjectPage>(this.url + "/viewGamesByPlatform", { params });
  }

  getPlatformById(idPlatform: number): Observable<Platform> {
    let params = new HttpParams().set('idPlatform', idPlatform)
    return this.http.get<Platform>(this.url + "/getPlatformById", { 'params': params })
  }

}
