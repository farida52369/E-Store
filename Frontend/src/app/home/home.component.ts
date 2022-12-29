import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { ProductService } from '../services/product/product.service';
import { CartService } from '../cart/cart.service';
import { SearchService } from '../services/search/search.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  details: any;
  productToCart: any;
  @ViewChild('noProductFound') noProductEle: ElementRef | undefined;
  loggin!: boolean;
  isManager!: Boolean;
  searchBy!: string;

  constructor(
    private authService: AuthService,
    private productService: ProductService,
    private searchService: SearchService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    // this.loggin = this.authService.isLoggedIn();
    this.loggin = true;
    this.showProducts();
    if (this.loggin) this.isManagerSubscribe();
  }

  private isManagerSubscribe() {
    this.authService.isManager().subscribe((res) => {
      this.isManager = res;
    });
  }

  // Search
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
    }
    else {
      this.showProducts();
    }      
  }

  // Requesting the products from the backend
  private showProducts() {
    this.setNoProductToNull();
    this.productService.getAllProducts().subscribe((res) => {
      const productsDiv = document.getElementById('products');
      if (productsDiv) productsDiv.innerHTML = '';
      this.details = res;
    });
  }

  // Adding a product to cart
  addToCart(productIndex: number) {
    this.productToCart = this.details[productIndex];
    this.productToCart.quantity = 1;
    this.productToCart.total_price = this.productToCart.quantity * this.productToCart.price;
    this.cartService.storageCart(this.productToCart);
  }

  // No returned products from the backend
  private setNoProductToNull() {
    if (this.noProductEle)
      this.noProductEle.nativeElement.style.display = 'none';
  }

  private setNoProductDetails() {
    if (this.noProductEle) {
      this.noProductEle.nativeElement.style.display = 'block';
      this.noProductEle.nativeElement.style.fontSize = '20px';
      this.noProductEle.nativeElement.style.marginLeft = '32%';
    }
  }

  getCategory(category: string) {
    this.setNoProductToNull();
    // Adjust it on the services file -- Add the specific route on the server side
    this.productService.getProductsByCategory(category).subscribe((res) => {
      const productsDiv = document.getElementById('products');
      if (productsDiv) productsDiv.innerHTML = '';
      this.details = res;
    });
  }

  logOut() {
    this.cartService.clearCart();
    this.authService.logout();
  }
}
