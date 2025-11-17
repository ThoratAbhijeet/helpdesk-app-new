import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { AuthGuard } from '../../shared/auth-guard.service';
import { SignUpComponent } from './sign-up/sign-up.component';

const routes: Routes = [
    {
    path: "",
    redirectTo: "auth",
    pathMatch:'full'
  },
  {
    path: "auth",
    component: LoginComponent,
    pathMatch: "full",
  }, 
    {
    path: "sign-up",
    component: SignUpComponent,
    pathMatch: "full",
  }, 
  {
    path: "forgot-password",
    component:ForgotPasswordComponent,
    pathMatch: "full",
  },
    {
    path: "change-password",
    component:ChangePasswordComponent,
    pathMatch: "full",
    outlet: "auth_menu",
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
