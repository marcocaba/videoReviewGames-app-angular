import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiServiceUsersService } from '../api-service-users.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [NgIf],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {

  logged: boolean = false;  

  constructor(private router: Router, private apiServiceUsers: ApiServiceUsersService) {
    this.isLogged();
  }

  isLogged() {
    this.apiServiceUsers.checkLogInState().subscribe({
      next: response => {
        this.logged = response
      },
      error: error => {
        console.log(error);
      }
    })
  }


  signIn(){
    this.router.navigate(['/login'])
  }
}
