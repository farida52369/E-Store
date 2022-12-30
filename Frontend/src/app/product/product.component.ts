import { Component, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../cart/cart.service';
import { ProductService } from '../services/product/product.service';
import { Cart } from '../dto/data';
import { AuthService } from '../services/auth/auth.service';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
  ngOnInit(): void {
    this.product=this.viewInfo();
    this.confirmEdit=this.compareCurrentWithSeller();
 }
 constructor(
   private productService: ProductService,
   private router :Router,
   private cartService: CartService,
   private readonly _elementRef: ElementRef,
   private authService: AuthService,
 ){
    
 }
 
 product: any;

 viewInfo(){
  return this.productService.getAllInfo();     
 }
 confirmEdit:boolean=false;
 compareCurrentWithSeller(){
  if(this.product.seller === this.authService.getUserEmail()){
    return true;
  }else{
    return false;
  }
   
 }

 noEdit_price:boolean=true;
 noEdit_inStock:boolean=true;
 noEdit_cat:boolean=true;
 noEdit_title:boolean=true;
 noEdit_desc:boolean=true;
 
 
 editPrice() {
  this.noEdit_price=false;
}
exitEditPrice() {
  this.noEdit_price=true;
  this.product.price=(<HTMLInputElement>document.getElementById("price_after_edit") ).value;
}
editInStock(){
   this.noEdit_inStock=false;
}
exitEditInStock(){
  this.noEdit_inStock=true;
   this.product.inStock=(<HTMLInputElement>document.getElementById("inStock_after_edit") ).value;
}
editCategory(){
  this.noEdit_cat=false;
}
exitEditCategory(){
  this.noEdit_cat=true;
  this.product.category=(<HTMLInputElement>document.getElementById("cat_after_edit") ).value;
}
editTitle(){
  this.noEdit_title=false;
}
exitEditTitle(){
  this.noEdit_title=true;
  this.product.title=(<HTMLInputElement>document.getElementById("title_after_edit") ).value;
}
editDescription(){
  this.noEdit_desc=false;
}
exitEditDescription(){
  this.noEdit_desc=true;
  this.product.description=(<HTMLInputElement>document.getElementById("desc_after_edit") ).value;
}

 backHome(){
  this.router.navigateByUrl('home', { state: { logged: true }});
}

toCart:Cart={
  productId: 0,
  title: '',
  price: 0,
  category: '',
  inStock: 0,
  description: '',
  image: undefined,
  quantity: 0,
  total_price: 0
}
addToCart(){
  this.toCart=this.product;
  this.toCart.quantity = 1;
  this.toCart.total_price =
  this.toCart.quantity * this.toCart.price;

  this.cartService.storageCart(this.toCart);
  let ele = document.getElementById('to-cart');
      if (ele) {
        ele.style.display = 'block';
        ele.style.color = 'red';
        ele.style.paddingLeft = '10px';
      }
}

}
