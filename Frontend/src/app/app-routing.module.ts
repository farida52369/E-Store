import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';




const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {path: 'profile' , component: ProfileComponent},
  {path: 'Register' , component: RegisterComponent }
  
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents =[LoginComponent , ProfileComponent, RegisterComponent ]