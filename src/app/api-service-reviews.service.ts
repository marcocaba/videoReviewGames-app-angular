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

  addReview(review: Review): Observable<string> {
    return this.http.post<string>(this.url + '/addReviewUser', review, { responseType: 'text' as 'json' })
  }

  viewReviewsUser(idUser: any, page: number): Observable<ObjectPage> {
    let params = new HttpParams()
      .set('idUser', idUser)
      .set('page', page);
    return this.http.get<ObjectPage>(this.url + '/viewReviewsUser', { params })
  }

  removeReview(idGame: any): Observable<string> {
    let params = new HttpParams().set('idGame', idGame);
    return this.http.delete(this.url + '/removeReviewUser', { params: params, responseType: 'text' });
  }

  updateReview(review: Review): Observable<boolean> {
    return this.http.post<boolean>(this.url + '/updateReview', review)
  }

}
