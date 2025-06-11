import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CreatorsComponent } from './creators/creators.component';
import { GamesComponent } from './games/games.component';
import { PlatformsComponent } from './platforms/platforms.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { UserComponent } from './user/user.component';
import { TagsComponent } from './tags/tags.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { ViewGameComponent } from './view-game/view-game.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'creators', component: CreatorsComponent },
    { path: 'games', component: GamesComponent },
    { path: 'tags', component: TagsComponent },
    { path: 'platforms', component: PlatformsComponent },
    { path: 'reviews', component: ReviewsComponent },
    { path: 'user', component: UserComponent },
    { path: 'favorites', component: FavoritesComponent },
    { path: 'viewGame/:idGame', loadComponent: () => import('./view-game/view-game.component').then(m => m.ViewGameComponent) },
    { path: 'creators/:creatorId', loadComponent: () => import('./creators/creators.component').then(m => m.CreatorsComponent) },
    { path: 'tags/:tagsId', loadComponent: () => import('./tags/tags.component').then(m => m.TagsComponent) },
    { path: 'platforms/:platformId', loadComponent: () => import('./platforms/platforms.component').then(m => m.PlatformsComponent) },
    { path: 'login', loadComponent: () => import('./login/login.component').then(m => m.LoginComponent)}
];
