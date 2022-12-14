import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

  title = '';
  status: any;
  filter: string = '';
  
  getFilter(val: string) {
    this.filter = val;
  }

  ngOnInit(): void {
    this.status = history.state.logged;
    if (this.status) {
      this.updateStatus();
    }
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
  }
}
