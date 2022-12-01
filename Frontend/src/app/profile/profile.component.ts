import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  constructor() { }

edit:any;
newFname:any;
newLname:any;
newTel:any;
  afterClick(){
    this.edit=(<HTMLInputElement>document.getElementById("box-edit"));
    if(this.edit.style.display=== "block"){
      this.edit.style.display= "none";
    }else{
      this.edit.style.display= "block";
    }
  }

  EditProfile(){
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


}
