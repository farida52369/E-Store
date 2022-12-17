import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { AddItemComponent } from './add-item/add-item.component';
import { CartComponent } from './cart/cart.component';

const routes: Routes = [
  { path: 'api/auth/login', component: LoginComponent },
  { path: 'api/auth/profile', component: ProfileComponent },
  { path: 'home', component: HomeComponent },
  { path: 'api/auth/register', component: RegisterComponent },
  { path: 'api/auth/add-item', component: AddItemComponent },
  {path: 'cart' , component:CartComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
export const routingComponents = [
  LoginComponent,
  ProfileComponent,
  HomeComponent,
  RegisterComponent,
  AddItemComponent,
  CartComponent
];
