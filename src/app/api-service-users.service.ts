import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './models/User';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceUsersService {
  
  url: string = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  getUserById(id: any): Observable<User> {
  return this.http.get<User>(this.url+ '/getUserById/'+ id);
}

}
