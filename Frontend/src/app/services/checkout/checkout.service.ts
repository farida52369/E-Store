import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CheckoutRequest } from 'src/app/dto/data';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  constructor(private http: HttpClient) {}

  sendCheckoutProducts(products: CheckoutRequest) {
    return this.http.post<void>(
      `${environment.apiBaseUrl}/api/checkout`,
      products,
      {
        observe: 'events',
        reportProgress: true,
      }
    );
  }
}
