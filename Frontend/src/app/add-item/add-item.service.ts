import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProductRequest } from '../dto/data';

@Injectable({
  providedIn: 'root'
})
export class AddItemService {

  constructor(private http: HttpClient) { }

  private shopURL = environment.apiBaseUrl

  public createProduct(product: FormData) {
    
    const headers = { 'content-type': undefined };
    return this.http.post<void>(`${this.shopURL}/api/product/create`, product, {
      observe: 'events',
      reportProgress: true
    })
  }
}
