import { Component, OnInit } from '@angular/core';
import { CartService } from './cart.service';

import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  ngOnInit(): void {
    this.updateTotals();

  }
  constructor(private cartService: CartService, private router: Router) { }

  cart = {
    shipping: 5.00,
    products: [
      {
        "name": "Maybelline Instant Age Rewind Eraser Dark Circles Treatment Multi-Use Concealer, 120, 1 Count",
        "price": 8.80,
        "img": "https://m.media-amazon.com/images/W/WEBP_402378-T1/images/I/611iMz35GNL._SX425_.jpg",
        "desc": "Erase the look of dark circles, correct the appearance of redness and brighten the look of dull skin with Instant Age Rewind Eraser multi-use concealer MAX OUT THOSE LASHES: Designed to max out every lash, Lash Blast Volume Mascara creates 10 times more volume instantly MAX OUT THOSE LASHES: Designed to max out every lash, Lash Blast Volume Mascara creates 10 times more volume instantly",
        "quantity": 2,
        "category": "fashion",
        "total_price": 17.6
      },
      {
        "name": "Self stirring mug",
        "img": "https://i.dailymail.co.uk/i/pix/2012/09/16/article-2204256-15053801000005DC-304_634x524.jpg",
        "price": 12.35,
        "desc": "Don't get tired!",
        "quantity": 1,
        "category": "kitchen",
        "total_price": 12.35
      },
      {
        "name": "Covergirl Lash Blast Volume Mascara, Very Black",
        "img": "https://m.media-amazon.com/images/W/WEBP_402378-T1/images/I/31lR-riNXRL._SX300_SY300_QL70_FMwebp_.jpg",
        "price": 8.53,
        "desc": "MAX OUT THOSE LASHES: Designed to max out every lash, Lash Blast Volume Mascara creates 10 times more volume instantly",
        "quantity": 1,
        "category": "fashion",
        "total_price": 8.53
      }
    ],
  }

subtotal:any=0;
total:any=0;
tax:any;

  removeProduct(id:any) {
    this.cart.products.splice(id,1);
    this.updateTotals();
  }
  
  deleteAll(){
    for(var i=0;i< this.cart.products.length ; i += 1){
      this.cart.products.splice(i);
    }
    this.updateTotals();
  }

  addProduct(id:any) {
      this.cart.products[id].quantity++;
      var quan=this.cart.products[id].quantity;

      this.updateProductSubtotal(id, quan);
  }

  subtractProduct(id:any) {
    var quan=this.cart.products[id].quantity;
    if(quan <=0){
      quan=0;
    }else{
      this.cart.products[id].quantity--;
      quan=this.cart.products[id].quantity;
    } 
    this.updateProductSubtotal(id, quan);
  }

  
  updateProductSubtotal(id: any, quantity: any) {
      var subtotalPrice=this.cart.products[id].price * quantity;
      this.cart.products[id].total_price=Number(subtotalPrice.toFixed(2));

      this.updateTotals();
  }

  updateTotals() {
    this.total=0.00;
    var subt=0;
    for (var i = 0; i < this.cart.products.length; i += 1) {
       subt += this.cart.products[i].total_price;
    }
    this.subtotal=subt.toFixed(2);
    this.tax=(this.subtotal * 0.05).toFixed(2);
    console.log(this.subtotal);
    if(this.subtotal > 0.00){
      this.total = (Number(this.subtotal) + Number(this.tax) + Number(this.cart.shipping)).toFixed(2);
    }

  }

  backHome(){
    this.router.navigateByUrl('home', { state: { logged: true } });
  }

}