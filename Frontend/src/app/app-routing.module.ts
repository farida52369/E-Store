import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
<<<<<<< Updated upstream

=======


const routes: Routes = [
  { path: 'login', component: LoginComponent }
 
>>>>>>> Stashed changes

const routes: Routes = [
   {path: 'Login' , component: LoginComponent}
 
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
<<<<<<< Updated upstream
export const routingComponents =[LoginComponent  ]
=======
export const routingComponents = [LoginComponent]
>>>>>>> Stashed changes
