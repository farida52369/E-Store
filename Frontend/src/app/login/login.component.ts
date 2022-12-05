import { Component } from '@angular/core';
import { LoginService } from './login.service';
import { LoginRequest } from '../dto/data';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(private loginSer: LoginService, private router: Router) {}

  postingUser(user: LoginRequest): void {
    console.log('user => ', user);
    this.loginSer.postUser(user).subscribe(
      () => {
        console.log('I POSTED THE USER TO THE SERVER :)');
        this.router.navigateByUrl('home', { state: { logged: true } });
      },
      (error: HttpErrorResponse) =>
        console.log('7AZ AWFR EL MARA EL GAYA!!\nError: ' + error.message)
    );
  }

  logIn(): void {
    const email = (<HTMLInputElement>document.getElementById('your_email'))
      .value;
    const password = (<HTMLInputElement>document.getElementById('your_pass'))
      .value;
    console.log('Email: ' + email + ' Password: ' + password);
    const user: LoginRequest = {
      email: email,
      password: password,
    };
    this.postingUser(user);
  }
}
