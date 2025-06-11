import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiServiceUsersService } from '../api-service-users.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  nameUser: string = "";
  firstPassword: string = "";
  secondPassword: string = "";

  constructor(private apiServiceUsers: ApiServiceUsersService, private router: Router) {

  }

  register() {
    this.apiServiceUsers.registerUser(this.nameUser, this.firstPassword, this.secondPassword).subscribe({
      next: response => {
        if (response == "passwordsNotTheSame") {
          alert("Las contraseñas no coinciden")

        } else if (response == "userNameExist") {
          alert("Ya existe un usuario con ese nombre")

        } else if (response == "userRegister") {
          alert("Usuario registrado con exito")
          this.router.navigate(['/login']);
        }
      },
      error: error => {
        console.error(error);
      }
    })
  }
}
