import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ProductRequest } from '../dto/data';
import { AddItemService } from './add-item.service';


@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent {

  constructor(private service: AddItemService) { }

  imageToBeUploaded!: File;


  public onFileChange(event: any) {
    this.imageToBeUploaded = event.target.files[0];
  }


  public addItem() {
    const title = (<HTMLInputElement>document.getElementById('title')).value;
    const price: number = parseFloat((<HTMLInputElement>document.getElementById('price')).value);
    const quantity = parseInt((<HTMLInputElement>document.getElementById('quantity')).value);
    const category = (<HTMLInputElement>document.getElementById('c')).value;
    const desc = (<HTMLInputElement>document.getElementById('desc')).value;

    const product: ProductRequest = {
      productId: 1,
      title: title,
      price: price,
      category: category,
      inStock: quantity,
      description: desc
    }

    const formParams = new FormData();
    formParams.append('imageFile', new Blob([this.imageToBeUploaded], {
      type: 'multipart/form-data'
    }), this.imageToBeUploaded.name);
    formParams.append('product', new Blob([JSON.stringify(product)], {
      type: 'application/json'
    }))
    console.log("form params => " + formParams.get("product"))
    console.log("form params => " + formParams.get("imageFile"))

    this.service.createProduct(formParams).subscribe(
      (res) => {
        console.log("YUUUUUUUUUUUUP");
      }, (error) => {
        console.log("YARABBBBBBBBBBB")
      }
    )
  }


}





