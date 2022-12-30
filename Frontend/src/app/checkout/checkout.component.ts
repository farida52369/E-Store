import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart/cart.service';
import { CheckoutRequest } from '../dto/data';
import { AuthService } from '../services/auth/auth.service';
import { CheckoutService } from '../services/checkout/checkout.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  constructor(
    private cartService: CartService,
    private authService: AuthService,
    private checkoutService: CheckoutService
  ) {}

  ngOnInit(): void {}

  checkout() {
    const cartProducts: CheckoutRequest = {
      customer: this.authService.getUserEmail(),
      products: this.cartService.getCheckoutProducts(),
    };
    console.log('Cart Products To Be Checkout => ', cartProducts);
    this.checkoutService.sendCheckoutProducts(cartProducts).subscribe(
      () => {
        console.log('We Checkout, Babe .. HeHe');
        this.cartService.clearCart();
      }
    );
  }
}
