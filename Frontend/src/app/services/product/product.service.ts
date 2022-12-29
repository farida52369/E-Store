import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductResponse, ProductSpecificDetails } from 'src/app/dto/data';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  public createProduct(product: FormData) {
    return this.http.post<void>(
      `${environment.apiBaseUrl}/api/product/create`,
      product,
      {
        observe: 'events',
        reportProgress: true,
      }
    );
  }

  public getProduct(id: number): Observable<ProductResponse> {
    return this.http.get<ProductResponse>(
      `${environment.apiBaseUrl}/api/product/get/${id}`
    );
  }

  public getAllProducts(): Observable<ProductSpecificDetails[]> {
    return this.http.get<ProductSpecificDetails[]>(
      `${environment.apiBaseUrl}/api/product/all`
    );
  }

  public getProductsByCategory(_category: string) {
    return this.http.get<ProductSpecificDetails[]>(
      `${environment.apiBaseUrl}/api/product`
    );
  }

  public getProductsSorted(sort: string) {
    return this.http.get<ProductSpecificDetails[]>(
      `${environment.apiBaseUrl}/api/product`
    );
  }
}
