import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient) { }

  password: any
  email: any
  res: any;
  LogIn() {
    this.email = (<HTMLInputElement>document.getElementById("your_email")).value;
    this.password = (<HTMLInputElement>document.getElementById("your_pass")).value;
    if (this.password === '' || this.email === '') {
      return;
    }
    console.log("Email: " + this.email);
    console.log("Password: " + this.password);
  }

  LoginReqandRes() {
    this.http.get('http://localhost:4200/login', {
      responseType: 'text',
      params: {
        email: this.email,
        password: this.password,
      },
      observe: "response"

    })
      .subscribe((response) => {
        this.res = response.body
        if (this.res === "true") {
          this.router.navigateByUrl('main-page');

        } else {
          alert("Wrong e-mail or password!! Please try again.");
        }

      })

  }

}
