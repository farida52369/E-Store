import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    private checkoutService: CheckoutService,
    private router: Router
  ) {}

  ngOnInit(): void {}
  checked:boolean=false;
  checkout() {
    const cartProducts: CheckoutRequest = {
      customer: this.authService.getUserEmail(),
      products: this.cartService.getCheckoutProducts(),
    };
    console.log('Cart Products To Be Checkout => ', cartProducts);
    this.checkoutService.sendCheckoutProducts(cartProducts).subscribe(
      () => {
        var flag=this.getInformation();
        if( flag== true){
          console.log('We Checkout, Babe .. HeHe');
          this.cartService.clearCart();
          this.checked=true;
        }
      }
    );
  }

  getInformation(){
    if((<HTMLInputElement>document.getElementById('fname')).value ==='' || 
    (<HTMLInputElement>document.getElementById('email')).value ==='' || 
    (<HTMLInputElement>document.getElementById('adr')).value ==='' || 
    (<HTMLInputElement>document.getElementById('city')).value ==='' || 
    (<HTMLInputElement>document.getElementById('state')).value ==='' || 
    (<HTMLInputElement>document.getElementById('zip')).value ===''  ||
    (<HTMLInputElement>document.getElementById('cname')).value ===''  ||
    (<HTMLInputElement>document.getElementById('ccnum')).value ==='' || 
    (<HTMLInputElement>document.getElementById('expmonth')).value ===''  || 
    (<HTMLInputElement>document.getElementById('expyear')).value ==='' || 
    (<HTMLInputElement>document.getElementById('cvv')).value ===''){
      
      return false;
    }else{
      return true;
    }
  }
  backHome() {
    this.router.navigateByUrl('home', { state: { logged: true } });
  }


}
