import {Routes} from '@angular/router';
import {LoginPageComponent} from './modules/login/containers/login-page/login-page.component';
import {ProfilePageComponent} from './modules/login/containers/profile-page/profile-page.component';

export const routes: Routes = [
  {
    path: '',
    component: LoginPageComponent,
    title: 'Login / Preobrazhensky Demo',
  },
  {
    path: 'profile',
    component: ProfilePageComponent,
    title: 'Profile / Preobrazhensky Demo',
  },
];
