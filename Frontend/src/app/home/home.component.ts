import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService
  ) {}
  products: any;

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      if ((params['inHome'] !== undefined && params['inHome'] === 'true') || this.authService.isLoggedIn()) {
        this.updateStatus();
      }
    });
    this.showProducts();
  }

  updateStatus(): void {
    (<HTMLInputElement>document.getElementById('log-in')).style.display =
      'none';
    (<HTMLInputElement>document.getElementById('sign-up')).style.display =
      'none';
    (<HTMLInputElement>document.getElementById('profile')).style.display =
      'block';
    (<HTMLInputElement>document.getElementById('search')).style.marginLeft =
      '500px';
    (<HTMLInputElement>document.getElementById('logout')).style.display =
      'block';
    (<HTMLInputElement>document.getElementById('add-product')).style.display =
     'block';
  }

  showProducts() {
    this.products = [{ image: '../../assets/bike.jpg', price: 1000, name: 'Bike', id: '1' },
    { image: '../../assets/shoes.jpg', price: 29.99, name: 'Shoes', id:'2' },
    { image: '../../assets/bear.jpg', price: 9.99, name: 'Bear', id:'3'},
    { image: '../../assets/laptop.jpg', price: 10000, name: 'Laptop', id:'4' },
    {image: '../../assets/cleancode.jpg', price: 10, name: 'Clean Code', id: '5'},
    { image: '../../assets/phone.jpg', price: 100, name: 'Phone', id:'6' },
    { image: '../../assets/tv.jpg', price: 500, name: 'Television', id:'7' },
  {image: '../../assets/motorcycle.jpg', price: 5000, name: 'Motorcycle', id: '8'}];
    let elem = document.getElementById('products')
    for (let i = 0; i < this.products.length; i++) {
      this.buildCard(this.products[i]);
    }
  }
  
  buildCard(product: any){
    let e = document.createElement('div');
    e.setAttribute('style', 'box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2); min-width: 300px;margin: auto; text-align: center; max-width: 500px;');
    e.setAttribute('id', product.id);
    e.appendChild(this.buildImage(product));
    e.appendChild(this.buildHeader(product));
    e.appendChild(this.buildPrice(product));
    e.appendChild(this.buildButton(product));
    document.getElementById('products')?.appendChild(e);
    return e;
  }

  buildImage(product: any) {
    let i = document.createElement('img');
    i.setAttribute('src', product.image);
    i.setAttribute('style', '  width: 100%;height: 200px;');
    return i;
  }

  buildHeader(product: any) {
    let h = document.createElement('h1');
    h.innerText = product.name;
    return h;
  }

  buildPrice(product: any) {
    let p = document.createElement('p');
    p.setAttribute('style', 'color: grey;font-size: 22px;');
    p.innerText = `$${product.price}`;
    return p;
  }

  buildButton(product: any) {
    let b = document.createElement('button');
    let a = document.createElement('a');
    b.setAttribute('style', 'border: none;outline: 0;padding: 12px;color: white;background-color: #000;text-align: center;cursor: pointer;width: 100%;font-size: 18px;')
    b.innerText = 'Add to Cart';
    return b;
  }


  logOut() {
    this.authService.logout();
  }
}
