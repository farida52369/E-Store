import { Component } from '@angular/core';
import { LoginRequest } from '../dto/data';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(private authService: AuthService, private router: Router) {}

  isError: boolean | undefined;

  private logIn(user: LoginRequest): void {
    this.authService.login(user).subscribe(
      (res) => {
        this.router.navigate(['/home'], {
          queryParams: { inHome: 'true' },
        });
        this.isError = false;
        console.log('I LOGGED THE USER TO THE SERVER :)');
      },
      (error: HttpErrorResponse) => {
        this.alert();
        this.isError = true;
      }
    );
  }

  alert() {
    (<HTMLInputElement>document.getElementById('alert')).style.display =
      'block';
    window.setTimeout(() => {
      const box = <HTMLInputElement>document.getElementById('alert');
      box.style.display = 'block';
    }, 5);
  }
  endAlert() {
    (<HTMLInputElement>document.getElementById('alert')).style.display = 'none';
  }

  submit(): void {
    const email = (<HTMLInputElement>document.getElementById('your_email'))
      .value;
    const password = (<HTMLInputElement>document.getElementById('your_pass'))
      .value;
    const user: LoginRequest = {
      email: email,
      password: password,
    };
    this.logIn(user);
  }
}
