import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ProductSpecificDetails } from '../dto/data';
import { AuthService } from '../services/auth/auth.service';
import { ProductService } from '../services/product/product.service';
import {ProductResponse} from '../dto/data';
import { CartService } from '../cart/cart.service';
import { Observable } from 'rxjs';
import {Cart} from '../dto/data';
import { LocalStorageService } from 'ngx-webstorage';
import { SearchService } from '../services/search/search.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  details: Array<ProductSpecificDetails> | undefined;
  @ViewChild('noProductFound') noProductEle: ElementRef | undefined;
  loggin!: boolean;
  isManager!: Boolean;
  searchBy!: string;

  constructor(
    private authService: AuthService,
    private productService: ProductService,
    private searchService: SearchService,
    private cartService : CartService)
    {}
    
  details: any;//Array<ProductSpecificDetails> | undefined;
    
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

  getProductsByWord(word: any) {
    if (word) {
      this.searchBy = word;
      this.searchService.getProductsByWord(word).subscribe((res) => {
        const productsDiv = document.getElementById('products');
        if (productsDiv) productsDiv.innerHTML = '';
        if (res.length === 0) {
          this.details = [];
          this.setNoProductDetails();
        } else {
          this.details = res;
          this.setNoProductToNull();
        }
      });
    } else this.showProducts();
  }

  private showProducts() {
    this.setNoProductToNull();
    this.productService.getAllProducts().subscribe((res) => {
      const productsDiv = document.getElementById('products');
      if (productsDiv) productsDiv.innerHTML = '';
      this.details = res;
    });
  }
  
 
  productTocart:any ; 
  
  addToCart(productIndex: number){
    
    this.productTocart=this.details[productIndex];
    this.productTocart.quantity=1;
    this.productTocart.total_price=this.productTocart.quantity * this.productTocart.price;
    
    this.cartService.storageCart(this.productTocart);
    
   }
   
    private setNoProductToNull() {
    if (this.noProductEle) this.noProductEle.nativeElement.style.display = 'none';
  }

  private setNoProductDetails() {
    console.log('Marry Christmas :)');
    if (this.noProductEle) {
      this.noProductEle.nativeElement.style.display = 'block';
      this.noProductEle.nativeElement.style.fontSize = '20px';
      this.noProductEle.nativeElement.style.marginLeft = '32%';
    }
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
    this.cartService.clearCart();
    this.authService.logout();
  }
}
