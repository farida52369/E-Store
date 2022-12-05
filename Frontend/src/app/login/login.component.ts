import { Component } from '@angular/core';
import {  Router } from '@angular/router';
import { LoginService } from './login.service';
import { LoginRequest } from '../dto/data';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private loginSer : LoginService , private router: Router) { }


   postingUser(user: LoginRequest): void {
    const message="wrong email or password,write them correctly if you already have an account or register if you have no account";
    console.log('user => ', user)
    this.loginSer.postUser(user).subscribe(
      () => {
        console.log("I POSTED THE USER TO THE SERVER :)")
        this.router.navigateByUrl('home', {state: {logged: true}});
      }, (error: HttpErrorResponse) => 
     // console.log("7AZ AWFR EL MARA EL GAYA!!\nError: " + error.message)
      alert(message)
      
    )
  }

  password: any
  email: any
  res: any;
  logIn() {
    this.email = (<HTMLInputElement>document.getElementById("your_email")).value;
    this.password = (<HTMLInputElement>document.getElementById("your_pass")).value;
    console.log("Email: " + this.email);
    console.log("Password: " + this.password);
    const user:LoginRequest = {
      email:this.email,
      password:this.password

    }
    this.postingUser(user);
   

    
  }

 
}
