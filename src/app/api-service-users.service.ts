import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './models/User';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceUsersService {

  url: string = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(this.url + '/getUserById/' + id);
  }

  getLogIn(nameUser: string, password: string): Observable<string> {
    let params = new HttpParams().set('nameUser', nameUser).set('password', password);
    return this.http.get(this.url + "/logInUser", { params: params, responseType: 'text' });
  }

  getNameUserByIdUser(): Observable<string> {
    return this.http.get(this.url + "/getNameUserByIdUser", { responseType: 'text' });
  }

  checkLogInState(): Observable<boolean> {
    return this.http.get<boolean>(this.url + "/checkLogInState");
  }

  logOutUser(): Observable<boolean> {
    return this.http.get<boolean>(this.url + "/logOutUser");
  }

  registerUser(nameUser: string, firstPassword: string, secondPassword: string): Observable<string> {
    let params = new HttpParams()
      .set('nameUser', nameUser)
      .set('firstPassword', firstPassword)
      .set('secondPassword', secondPassword);
    return this.http.post(this.url + "/registerUser", null, { params: params, responseType: 'text' });
  }

}
