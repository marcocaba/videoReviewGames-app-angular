import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CreatorsComponent } from './creators/creators.component';
import { GamesComponent } from './games/games.component';
import { PlatformsComponent } from './platforms/platforms.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { UserComponent } from './user/user.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent},
    { path: 'creators', component: CreatorsComponent},
    { path: 'games', component: GamesComponent},
    { path: 'platforms', component: PlatformsComponent}, 
    { path: 'reviews', component: ReviewsComponent},
    { path: 'user', component: UserComponent},
    { path: 'creators/:creatorId', loadComponent: () => import('./creators/creators.component').then(m => m.CreatorsComponent)
}
];
