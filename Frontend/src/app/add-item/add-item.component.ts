import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';


@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent  {
  
  constructor(private httpClient: HttpClient,) { }
  
  public uploadfile(file: File) {
    let formParams = new FormData();
    formParams.append('file', file)
  }

  file: any;
 
  onFilechange(event: any) {
    this.file = event.target.files[0];
    console.log(this.file);
  }

  addItem(){
    const title=(<HTMLInputElement>document.getElementById('title')).value;
    const price=(<HTMLInputElement>document.getElementById('price')).value;
    const quantity=(<HTMLInputElement>document.getElementById('quantity')).value;
    const category=(<HTMLInputElement>document.getElementById('c')).value;
    const desc=(<HTMLInputElement>document.getElementById('desc')).value;
    const photo=(<HTMLInputElement>document.getElementById('file')).value;
    console.log("doneee");

  }
  

}





