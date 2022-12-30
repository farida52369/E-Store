import { Injectable } from '@angular/core';
import { Cart } from '../dto/data';
import { LocalStorageService } from 'ngx-webstorage';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private localStorage: LocalStorageService) {}

  values: Array<Cart> = [];
  after_removed: Array<Cart> = [];

  storageCart(product: Cart) {
    this.values = JSON.parse(this.getCart());

    if (this.values == null) this.values = [];
    const find_prod = this.values.find((res) => {
      if (res.quantity !== product.quantity && res.title === product.title) {
        res.quantity = product.quantity;
        res.total_price = res.quantity * res.price;
      }
      return res.title === product.title;
    });

    if (!find_prod) {
      this.values.push(product);
    }
    this.localStorage.store('cart', JSON.stringify(this.values));
  }

  clearCart() {
    this.localStorage.clear('cart');
  }

  removeProduct(removed_product: any) {
    this.after_removed = JSON.parse(this.getCart());
    const index = this.after_removed.findIndex((object) => {
      return object.title === removed_product.title;
    });
    if (index !== -1) {
      this.after_removed.splice(index, 1);
    }
    this.localStorage.store('cart', JSON.stringify(this.after_removed));
  }

  getCart() {
    return this.localStorage.retrieve('cart');
  }
}
