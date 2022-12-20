import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterRequest } from '../dto/data';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  constructor(private authService: AuthService, private router: Router) {}

  // POSTING A SHAPE TO THE BACKEND
  postingUser(user: RegisterRequest): void {
    this.authService.register(user).subscribe(
      () => {
        console.log('I POSTED THE USER TO THE SERVER :)');
        this.router.navigate(['/home'], {
          queryParams: { inHome: 'true' },
        });
      },
      (error: HttpErrorResponse) =>
        console.log('7AZ AWFR EL MARA EL GAYA!!\nError: ' + error.message)
    );
  }

  submit(): void {
    const firstName = (<HTMLInputElement>document.getElementById('fname'))
      .value;
    const lastName = (<HTMLInputElement>document.getElementById('lname')).value;
    const email = (<HTMLInputElement>document.getElementById('address')).value;
    const password = (<HTMLInputElement>document.getElementById('password'))
      .value;
    const phoneNumber = (<HTMLInputElement>document.getElementById('phone'))
      .value;
    const dateOfBirth = (<HTMLInputElement>document.getElementById('birthday'))
      .value;
    const gender = (<HTMLInputElement>document.getElementById('gender')).value;

    const user: RegisterRequest = {
      firstName: firstName,
      lastName: lastName,
      password: password,
      email: email,
      gender: gender,
      phoneNumber: phoneNumber,
      dateOfBirth: dateOfBirth,
    };
    console.log(password.length);
    if (password.length >= 8) {
      this.postingUser(user);
    }
  }
}
