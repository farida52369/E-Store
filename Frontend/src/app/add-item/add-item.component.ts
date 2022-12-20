import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductRequest } from '../dto/data';
import { AddItemService } from './add-item.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css'],
})
export class AddItemComponent {
  constructor(private service: AddItemService, private router:Router) {}

  imageToBeUploaded!: File;
  image: any;

  public onFileChange(event: any) {
    const files = event.target.files;

    if (files.length === 0) return;

    this.imageToBeUploaded = files[0];

    // No need for that check _ already handled ..
    // const mimeType = files[0].type;
    // if (mimeType.match(/image\/*/) == null) {
    //     return;
    // }

    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.image = reader.result;
    };
  }

  public addItem() {
    const title = (<HTMLInputElement>document.getElementById('title')).value;
    const price: number = parseFloat(
      (<HTMLInputElement>document.getElementById('price')).value
    );
    const quantity = parseInt(
      (<HTMLInputElement>document.getElementById('quantity')).value
    );
    const category = (<HTMLInputElement>document.getElementById('c')).value;
    const desc = (<HTMLInputElement>document.getElementById('desc')).value;

    const product: ProductRequest = {
      productId: 1,
      title: title,
      price: price,
      category: category,
      inStock: quantity,
      description: desc,
    };

    const formParams = new FormData();
    formParams.append(
      'imageFile',
      new Blob([this.imageToBeUploaded], {
        type: 'multipart/form-data',
      }),
      this.imageToBeUploaded.name
    );
    formParams.append(
      'product',
      new Blob([JSON.stringify(product)], {
        type: 'application/json',
      })
    );
    console.log('form params => ' + formParams.get('product'));
    console.log('form params => ' + formParams.get('imageFile'));

    this.service.createProduct(formParams).subscribe(
      (res) => {
        console.log('YUUUUUUUUUUUUP');
        this.router.navigate(['/home'], {
          queryParams: { inHome: 'true' },
        });
      },
      (error) => {
        console.log('YARABBBBBBBBBBB');
      }
    );
  }
}