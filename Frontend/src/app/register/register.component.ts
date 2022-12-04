import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {


  fName:any = ""
  lName:any = ""
  address: any= ""
  password:any = ""
  //info:string = ''
  info: any
  UserName: any = ''
  gender: any=''
  phone: any=''
  Bd: any=''


  addFirstName(){
    const inputFirst = (<HTMLInputElement>document.getElementById('fname'))
    this.fName = inputFirst.value
    console.log(this.fName)
  }
  addLastName(){
    const inputLast = (<HTMLInputElement>document.getElementById('lname'))
    this.lName = inputLast.value
    console.log(this.lName)
  }
  addAddress(){
    const inputMail = (<HTMLInputElement>document.getElementById('address'))
    this.address =  inputMail.value
    console.log(this.address)
    }
  addPassword(){
    const inputPass = (<HTMLInputElement>document.getElementById('password'))
    this.password =  inputPass.value
    console.log(this.password)
  }
  addPhone(){
    const inputPh = (<HTMLInputElement>document.getElementById('phone'))
    this.phone =  inputPh.value
    console.log(this.phone)
  }
  addBd(){
    const inputBd = (<HTMLInputElement>document.getElementById('birthday'))
    this.Bd =  inputBd.value
    console.log(this.Bd)
  }
  addg(){
    const inputg = (<HTMLInputElement>document.getElementById('gender'))
    this.gender =  inputg.value
    console.log(this.gender)
  }
 
 
  validation(){                                                                   

      this.addFirstName()
      this.addLastName()
      this.addAddress()
      this.addPassword()
      this.addPhone()
      this.addBd()
      this.addg()

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
  
    }

   

    create(){
     // console.log(this.fName);
      //this.SIGNUP(this.INFO());
      //console.log(this.UserName);
      this.validation()
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