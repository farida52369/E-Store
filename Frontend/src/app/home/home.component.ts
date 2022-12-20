import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      if ((params['inHome'] !== undefined && params['inHome'] === 'true') || this.authService.isLoggedIn()) {
        this.updateStatus();
      }
    });
  }

  updateStatus(): void {
    (<HTMLInputElement>document.getElementById('log-in')).style.display =
      'none';
    (<HTMLInputElement>document.getElementById('sign-up')).style.display =
      'none';
    (<HTMLInputElement>document.getElementById('profile')).style.display =
      'block';
    (<HTMLInputElement>document.getElementById('search')).style.marginLeft =
      '500px';
    (<HTMLInputElement>document.getElementById('logout')).style.display =
      'block';
  }

  logOut() {
    this.authService.logout();
  }
}
