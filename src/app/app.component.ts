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

  idUser: number = 0;

  constructor(private router: Router,) {

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
