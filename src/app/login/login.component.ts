import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiServiceUsersService } from '../api-service-users.service';

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

  constructor(private apiServiceUser: ApiServiceUsersService, private router: Router) {

  }

  moveToRegister(){
    this.router.navigate(['/register']);
  }

  logIn() {
    this.apiServiceUser.getLogIn(this.nameUser, this.password).subscribe({
      next: response => {
        if (response == "invalidCredentials") {
          alert("Fallo en el inicio de sesión")

        } else if (response == "loged") {
          this.apiServiceUser.getNameUserByIdUser().subscribe({
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
