import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { FooterComponent } from "./footer/footer.component";
import { NgIf } from '@angular/common';
import { ApiServiceGamesService } from './api-service-games.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet, FooterComponent, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  logged: boolean = false;

  constructor(private router: Router, private apiServiceGames: ApiServiceGamesService ) {
    this.isLogged();
  }

  isLogged(){
    this.apiServiceGames.checkLogInState().subscribe({
      next: response => {
        this.logged=response
      },
      error: error => {
        console.log(error);
      }
    })
  }

  logOutUser(){
    this.apiServiceGames.logOutUser().subscribe({
      next: response => {
        this.logged=response
      },
      error: error => {
        console.log(error);
      }
    })
  }



  navigateTo(route: string) {
    if (this.router.url === route) {
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate([route]);
      });
    } else {
      this.router.navigate([route]);
    }
  }
}
