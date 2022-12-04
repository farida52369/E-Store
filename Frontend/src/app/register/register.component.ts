import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { RegisterRequest } from '../dto/data';
import { RegisterService } from './register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent {

  constructor(private registerSer: RegisterService) {}

    // POSTING A SHAPE TO THE BACKEND
    postingUser(user: RegisterRequest): void {
      console.log('user => ', user)
      this.registerSer.postUser(user).subscribe(
        () => {
          console.log("I POSTED THE USER TO THE SERVER :)")
        }, (error: HttpErrorResponse) => 
        console.log("7AZ AWFR EL MARA EL GAYA!!\nError: " + error.message)
      )
    }
 
  submit(){                                                            
      const firstName = (<HTMLInputElement>document.getElementById('fname')).value
      const lastName = (<HTMLInputElement>document.getElementById('lname')).value
      const email = (<HTMLInputElement>document.getElementById('address')).value
      const password = (<HTMLInputElement>document.getElementById('password')).value
      const phoneNumber = (<HTMLInputElement>document.getElementById('phone')).value
      const dateOfBirth = (<HTMLInputElement>document.getElementById('birthday')).value
      const gender = (<HTMLInputElement>document.getElementById('gender')).value
      console.log(firstName + " " + lastName + " " + email 
      + " " + password + " " + phoneNumber + " " + dateOfBirth + " " + gender)
      const user: RegisterRequest = {
        firstName: firstName,
        lastName: lastName,
        password: password,
        email: email,
        gender: gender,
        phoneNumber: phoneNumber,
        dateOfBirth: dateOfBirth
      }
      this.postingUser(user);

      /*
      if(this.fName=='' || this.lName==''){
        alert('Incomplete name')
        return false
      }
      else if(this.address.length<11 && this.password.length<8){
        alert('INVALID EMAIL and PASSWORD');
        return false
      }
      else if(this.address.length<11){
        alert('INVALID ADDRESS');
        return false
      }
      else if(this.password.length<8){
        alert('INVALID PASSWORD');
        return false
      }
      else if(this.phone.length != 11){
        alert('INVALID Phone number, it should be 11 number');
        return false
      }
      else if(this.Bd.length < "1/1/2008"){
        alert('INVALID BD');
        return false
      }


      else{
        let i = this.address.length
        if(this.address[i-1]!='m' || this.address[i-2]!='o' || this.address[i-3]!='c' 
        || this.address[i-4]!='.' || this.address[i-5]!='l' || this.address[i-6]!='i' 
        || this.address[i-7]!='a' || this.address[i-8]!='m' || this.address[i-9]!='E'
        || this.address[i-10]!='@'){
         
          alert('your address mail must ends with "@Email.com')
          return false;
        }
      }
     
      return true;
    }

    INFO(): string{
      this.addFirstName()
      this.addLastName()
      this.addAddress()
      this.addPassword()
      this.password()
      var user = new Map<string, string>();
      user.set("password" ,this.password);
      user.set("address" ,this.address);
      user.set("firstname", this.fName);
      user.set("lastname", this.lName);
      user.set("password", this.password);
      user.set("username", this.fName+""+this.lName)

     let result = Object.fromEntries(user);
     this.info = JSON.stringify(result)
     console.log(this.info)
      return this.info
      */
  
    }

   

    create(){
     // console.log(this.fName);
      //this.SIGNUP(this.INFO());
      //console.log(this.UserName);
      // this.validation()
      
      /*if(this.validation() && this.UserName!=""){
        this.router.navigateByUrl('/ver-bar')
      }
      else if(!this.validation){
        console.log("validation")
      }
      else if(this.UserName==""){
        console.log("4ofy el back")
      }
      else{
        alert("INVALID!")
      }*/
    }

}