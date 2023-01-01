import { Component, OnInit } from '@angular/core';
import { CartService } from './cart.service';
import { Router } from '@angular/router';
import { Cart } from '../dto/data';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  shipping: number = 5.0;
  product: Array<Cart> = [];
  subtotal: any = 0;
  total: any = 0;
  tax: any;

  ngOnInit(): void {
    this.setCartProducts();
    this.updateTotals();
  }
  
  constructor(private cartService: CartService, private router: Router) {}
  
  setCartProducts() {
    this.product = JSON.parse(this.cartService.getCart());
  }

  removeProduct(id: any) {
    this.cartService.removeProduct(this.product[id]);
    this.product.splice(id, 1);
    this.updateTotals();
  }

  deleteAll() {
    for (let i = 0; i < this.product.length; i += 1) {
      this.product.splice(i);
    }
    this.cartService.clearCart();
    this.updateTotals();
  }

  addProduct(id: any) {
    console.log(
      'Cart quantity: ' +
        this.product[id].quantity +
        '\nIn Stock: ' +
        this.product[id].inStock
    );
    // console.log('Product: ' + this.product[id])
    if (this.product[id].inStock <= this.product[id].quantity) return;
    this.product[id].quantity++;
    const quan = this.product[id].quantity;
    this.cartService.storageCart(this.product[id]);
    this.updateProductSubtotal(id, quan);
  }

  subtractProduct(id: any) {
    let quan = this.product[id].quantity;
    if (quan == 1) {
      quan = 1;
    } else {
      this.product[id].quantity--;
      quan = this.product[id].quantity;
    }
    this.cartService.storageCart(this.product[id]);
    this.updateProductSubtotal(id, quan);
  }

  updateProductSubtotal(id: any, quantity: any) {
    var subtotalPrice = this.product[id].price * quantity;
    this.product[id].totalPrice = Number(subtotalPrice.toFixed(2));
    this.updateTotals();
  }

  updateTotals() {
    this.total = 0.0;
    let subt = 0;
    for (let i = 0; i < this.product.length; i += 1) {
      subt += this.product[i].totalPrice;
    }
    this.subtotal = subt.toFixed(2);
    this.tax = (this.subtotal * 0.05).toFixed(2);
    console.log(this.subtotal);
    if (this.subtotal > 0.0) {
      this.total = (
        Number(this.subtotal) +
        Number(this.tax) +
        Number(this.shipping)
      ).toFixed(2);
    }
  }

  backHome() {
    this.router.navigateByUrl('home', { state: { logged: true } });
  }

  check() {
    this.router.navigateByUrl('checkout', { state: { logged: true } });
  }
}
