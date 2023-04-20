import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginPageComponent} from './containers/login-page/login-page.component';
import {LoginFormComponent} from './components/login-form/login-form.component';
import {ReactiveFormsModule} from '@angular/forms';
import { ProfilePageComponent } from './containers/profile-page/profile-page.component';
import {RouterLink} from '@angular/router';

const MODULE_DECLARATIONS = [
  LoginPageComponent,
  LoginFormComponent,
  ProfilePageComponent,
];

@NgModule({
  declarations: [
    MODULE_DECLARATIONS,
    ProfilePageComponent,
  ],
  exports: [
    MODULE_DECLARATIONS,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
  ],
})
export class LoginModule {
}
