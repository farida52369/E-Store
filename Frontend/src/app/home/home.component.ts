import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { ProductService } from '../services/product/product.service';
import { CartService } from '../cart/cart.service';
import { SearchService } from '../services/search/search.service';
import { UserService } from '../services/user/user.service';
import { ProductAllInfo } from '../dto/data';
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
  page: any = 1;

  constructor(
    private authService: AuthService,
    private productService: ProductService,
    private searchService: SearchService,
    private cartService: CartService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.loggin = this.authService.isLoggedIn();
    this.showProducts();
    if (this.loggin) this.isManagerSubscribe();
  }

  handlePageChange(e: any) {
    this.page = e;
    console.log(this.page);
  }

  getCategory(category: string) {
    this.searchBy = `Category: ${category}`;
    // Adjust it on the services file -- Add the specific route on the server side
    this.productService.getProductsByCategory(category).subscribe((res) => {
      const productsDiv = document.getElementById('products');
      if (productsDiv) productsDiv.innerHTML = '';
      if (res.length === 0) {
        this.details = [];
        this.setNoProductDetails();
      } else {
        this.details = res;
        this.setNoProductToNull();
      }
      // this.details = res;
    });
  }

  sortBy(sort: string) {
    this.searchBy = `Sorting By: ${sort}`;
    this.setNoProductToNull();
    this.productService.getProductsSorted(sort).subscribe((res) => {
      const productsDiv = document.getElementById('products');
      if (productsDiv) productsDiv.innerHTML = '';
      if (res.length === 0) {
        this.details = [];
        this.setNoProductDetails();
      } else {
        this.details = res;
        this.setNoProductToNull();
      }
      // this.details = res;
    });
  }

  private isManagerSubscribe() {
    this.authService.isManager().subscribe((res) => {
      this.isManager = res;
      console.log('Is Manager => ' + this.isManager);
    });
  }

  getProductsByWord(word: any) {
    if (word) {
      this.searchBy = `Word: ${word}`;
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
      console.log('All Products => ' + res);
      if (res.length === 0) {
        this.details = [];
        this.setNoProductDetails();
      } else {
        this.details = res;
        this.setNoProductToNull();
      }
      // this.details = res;
    });
  }

  viewProduct(id: any) {
    let productAllInfoToView: ProductAllInfo;
    this.productService
      .productAllInfo(id, this.authService.getUserEmail())
      .subscribe((res) => {
        productAllInfoToView = res;
        console.log(productAllInfoToView);
        this.productService.storageAllInfoForProduct(productAllInfoToView);
      });
  }

  addToCart(productIndex: number) {
    this.productToCart = this.details[productIndex];
    this.productToCart.quantity = 1;
    this.productToCart.totalPrice =
      this.productToCart.quantity * this.productToCart.price;

    this.cartService.storageCart(this.productToCart);
    let ele = document.getElementById('to-cart');
    if (ele) {
      ele.style.display = 'block';
      ele.style.color = 'red';
      ele.style.paddingLeft = '50%';
    }
  }

  private setNoProductToNull() {
    if (this.noProductEle)
      this.noProductEle.nativeElement.style.display = 'none';
  }

  private setNoProductDetails() {
    console.log('Marry Christmas :)');
    if (this.noProductEle) {
      this.noProductEle.nativeElement.style.display = 'block';
      this.noProductEle.nativeElement.style.fontSize = '22px';
    }
  }

  getManagerOwnerProducts() {
    this.userService
      .getManagerOwnedProducts(this.authService.getUserEmail())
      .subscribe((res) => {
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

  getCustomerPurchasedProducts() {
    this.userService
      .getCustomerPurchasedProducts(this.authService.getUserEmail())
      .subscribe((res) => {
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

  logOut() {
    this.cartService.clearCart();
    this.authService.logout();
  }
}
