import { Routes } from '@angular/router';
import { HomePageComponent, UserPageComponent } from './pages';

export const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
  },
  { path: 'user/:id', component: UserPageComponent },
];
