import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ProfileService } from './profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{

  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient
     ,private profileSer:ProfileService) { }
  data = { name: '', email: '', phoneNumber: '', dateOfBirth: '', gender: '' };

edit:any;
newFname:any;
newLname:any;
newTel:any;

ngOnInit(): void {
  this.postingUserr();
  }

  postingUserr(): void {
    
    this.profileSer.postUser1().subscribe(
      () => {
        console.log('I POSTED THE USER TO THE SERVER :)');
        this.router.navigateByUrl('api/auth/profile', { state: { logged: true } });
      },
      (error: HttpErrorResponse) =>
       console.log('7AZ AWFR EL MARA EL GAYA!!\nError: ' + error.message)
      
    );
  }
  updateFields() {
    (<HTMLInputElement>document.getElementById('name')).innerText = this.data.name;
    (<HTMLInputElement>document.getElementById('email')).innerText = this.data.email;
    (<HTMLInputElement>document.getElementById('phone-number')).innerText = this.data.phoneNumber;
    (<HTMLInputElement>document.getElementById('date-of-birth')).innerText = this.data.dateOfBirth;
    (<HTMLInputElement>document.getElementById('gender')).innerText = this.data.gender;
  }

  afterClick(){
    this.edit=(<HTMLInputElement>document.getElementById("box-edit"));
    if(this.edit.style.display=== "block"){
      this.edit.style.display= "none";
    }else{
      this.edit.style.display= "block";
    }
  }

  EditProfile(){
    this.afterClick();
    this.newFname=(<HTMLInputElement>document.getElementById("new-fname")).value;
    this.newLname=(<HTMLInputElement>document.getElementById("new-lname")).value;
    this.newTel=(<HTMLInputElement>document.getElementById("new-tel")).value;
    if(this.newFname=== '' ||  this.newLname=== '' || 
    !!(<HTMLInputElement>document.getElementById("new-tel")).type.match("[0-9]{11}")){
      return;
    }
    console.log(this.newFname);
    console.log(this.newLname); 
    console.log(this.newTel); 
  }

  
  BacktoHome(){
    this.router.navigateByUrl('home', {state: {logged: true}});
  }

}
