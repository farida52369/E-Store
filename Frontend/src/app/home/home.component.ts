import { Component, OnInit } from '@angular/core';
import { ProductSpecificDetails } from '../dto/data';
import { AuthService } from '../services/auth/auth.service';
import { ProductService } from '../services/product/product.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  loggin!: boolean;
  isManager!: Boolean;

  constructor(
    private authService: AuthService,
    private productService: ProductService
  ) {}

  //  details:ProductSpecificDetails; = {
  //   productId: number;
  //   title: string;
  //   price: number;
  //   image: any;
  // };
  details: Array<ProductSpecificDetails> | undefined;

  ngOnInit(): void {
    this.loggin = this.authService.isLoggedIn();
    this.showProducts();
    if (this.loggin) this.isManagerSubscribe();
  }

  private isManagerSubscribe() {
    this.authService.isManager().subscribe((res) => {
      this.isManager = res;
      console.log('Is Manager => ' + this.isManager);
    });
  }

  private showProducts() {
    this.productService.getAllProducts().subscribe((res) => {
      const productsDiv = document.getElementById('products');
      if (productsDiv) productsDiv.innerHTML = '';
      this.details = res;
    });
  }

  // buildCard(product: ProductSpecificDetails) {
  //   let e = document.createElement('div');
  //   // div -> id style
  //   //     img -> style src
  //   //     h1 ->
  //   //     p -> style
  //   e.setAttribute(
  //     'style',
  //     'box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2); min-width: 300px;margin: auto; text-align: center; max-width: 500px;'
  //   );
  //   e.setAttribute('id', product.productId + '');
  //   e.appendChild(this.buildImage(product.image));
  //   e.appendChild(this.buildHeader(product.title));
  //   e.appendChild(this.buildPrice(product.price));
  //   e.appendChild(this.buildButton());
  //   document.getElementById('products')?.appendChild(e);
  //   return e;
  // }

  // buildImage(img: any) {
  //   let i = document.createElement('img');
  //   i.setAttribute('src', 'data:image/jpeg;base64,' + img);
  //   i.setAttribute('style', '  width: 100%;height: 200px;');
  //   return i;
  // }

  // buildHeader(title: any) {
  //   let h = document.createElement('h1');
  //   h.innerText = title;
  //   return h;
  // }

  // buildPrice(price: any) {
  //   let p = document.createElement('p');
  //   p.setAttribute('style', 'color: grey;font-size: 22px;');
  //   p.innerText = `$${price}`;
  //   return p;
  // }

  // buildButton() {
  //   let b = document.createElement('button');
  //   b.setAttribute(
  //     'style',
  //     'border: none;outline: 0;padding: 12px;color: white;background-color: #000;text-align: center;cursor: pointer;width: 100%;font-size: 18px;'
  //   );
  //   b.innerText = 'Add to Cart';
  //   return b;
  // }

  logOut() {
    this.authService.logout();
  }
}
