import { Component } from '@angular/core';
import { ApiServiceGamesService } from '../api-service-games.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  nameUser: string = "";
  password: string = "";

  constructor(private apiServiceGames: ApiServiceGamesService, private router: Router,) {

  }

  logIn() {
    this.apiServiceGames.getLogIn(this.nameUser, this.password).subscribe({
      next: response => {
        if (response == "invalidCredentials") {
          alert("Fallo en el inicio de sesión")

        } else if (response == "loged") {
          this.apiServiceGames.getNameUserByIdUser().subscribe({
            next: response => {
              alert("Bienvenido "+response+"!!!")
              this.router.navigate(['/home']);
            },
            error: error => {
              console.error(error);
            }
          });
        }
      },
      error: error => {
        console.error(error);
      }
    })
  }

}
