import { Component } from '@angular/core';
import { ApiServiceGamesService } from '../api-service-games.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  nameUser: string = "";
  password: string = "";
  confirmation: string = "";
  
  constructor(private apiServiceGames: ApiServiceGamesService) {
    
  }


  logIn() {
    this.apiServiceGames.getLogIn(this.nameUser, this.password).subscribe({
      next: response => {
        this.confirmation = response
      },
      error: error => {
        console.error(error);
      }
    })
  }

}
