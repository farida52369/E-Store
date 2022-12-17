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
                this.alert()
      
    );
  }


  alert(){
    (<HTMLInputElement>document.getElementById('alert')).style.display="block";
    window.setTimeout(() => {
      const box = (<HTMLInputElement>document.getElementById('alert'));
      box.style.display = 'block';
    }, 5 );
  }
  endAlert(){
    (<HTMLInputElement>document.getElementById('alert')).style.display="none";
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
