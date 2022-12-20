import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ProfileService } from './profile.service';
import { LocalStorageService } from 'ngx-webstorage';
import { AuthService } from '../services/auth/auth.service';
import { ProfileInfoResponse } from '../dto/data';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  constructor(
    private router: Router,
    private profileSer: ProfileService,
    private authService: AuthService
  ) {}

  data: ProfileInfoResponse = {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    dateOfBirth: '',
    gender: '',
  };

  edit: any;
  newFname: any;
  newLname: any;
  newTel: any;

  ngOnInit(): void {
    this.getUserPersonalInfo();
  }

  getUserPersonalInfo(): void {
    this.profileSer.userProfileInfo(this.authService.getUserEmail()).subscribe(
      (res) => {
        this.data = res;
        console.log('I GRABBED USER INFO FROM THE SERVER :)');
        this.router.navigateByUrl('user/profile');
      },
      (error: HttpErrorResponse) =>
        console.log('7AZ AWFR EL MARA EL GAYA!!\nError: ' + error.message)
    );
  }

  updateFields() {
    (<HTMLInputElement>document.getElementById('name')).innerText =
      this.data.firstName + ' ' + this.data.lastName;
    (<HTMLInputElement>document.getElementById('email')).innerText =
      this.authService.getUserEmail();
    (<HTMLInputElement>document.getElementById('phone-number')).innerText =
      this.data.phoneNumber;
    (<HTMLInputElement>document.getElementById('date-of-birth')).innerText =
      this.data.dateOfBirth;
    (<HTMLInputElement>document.getElementById('gender')).innerText =
      this.data.gender;
  }

  afterClick() {
    this.edit = <HTMLInputElement>document.getElementById('box-edit');
    if (this.edit.style.display === 'block') {
      this.edit.style.display = 'none';
    } else {
      this.edit.style.display = 'block';
    }
  }

  editProfile() {
    this.afterClick();
    this.newFname = (<HTMLInputElement>(
      document.getElementById('new-fname')
    )).value;
    this.newLname = (<HTMLInputElement>(
      document.getElementById('new-lname')
    )).value;
    this.newTel = (<HTMLInputElement>document.getElementById('new-tel')).value;
    if (
      this.newFname === '' ||
      this.newLname === '' ||
      !!(<HTMLInputElement>document.getElementById('new-tel')).type.match(
        '[0-9]{11}'
      )
    ) {
      return;
    }
    console.log(this.newFname);
    console.log(this.newLname);
    console.log(this.newTel);
  }

  backToHome() {
    this.router.navigate(['/home'], {
      queryParams: { inHome: 'true' },
    });
  }
}
