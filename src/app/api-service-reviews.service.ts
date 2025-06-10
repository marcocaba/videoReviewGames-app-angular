import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ObjectPage } from './models/DTO/ObjectPage';
import { Review } from './models/Review';

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
    return this.http.get<ObjectPage>(this.url + '/viewReviewsByGame', { params })
  }

  // addReview(idUser: number, idGame: number, text: string, score: number): Observable<string> {
  //   console.log(idUser)
  //   let params = new HttpParams()
  //     .set('idUser', idUser)
  //     .set('idGame', idGame)
  //     .set('text', text)
  //     .set('score', score);
  //   return this.http.post<string>(this.url + '/addReviewUser', { params })
  // }


  addReview(review: Review): Observable<string> {
    return this.http.post<string>(this.url + '/addReviewUser', review)
  }
}
