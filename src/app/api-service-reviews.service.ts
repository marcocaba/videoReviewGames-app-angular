import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ObjectPage } from './models/DTO/ObjectPage';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceReviewsService {

  url: string = "http://localhost:8080";

  constructor(private http: HttpClient) { }

  getReviewsByGame(idGame: any, page: number): Observable<ObjectPage> {
    let params = new HttpParams()
      .set('idGame', idGame)
      .set('page', page);
    return this.http.get<ObjectPage>(this.url + '/viewReviewsByGame',{ 'params': params })
  }

}
