import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  ProductAllInfo,
  ProductEdit,
  ProductResponse,
  ProductSpecificDetails,
} from 'src/app/dto/data';
import { environment } from 'src/environments/environment';
import { LocalStorageService } from 'ngx-webstorage';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(
    private http: HttpClient,
    private localStorage: LocalStorageService,
    private router: Router
  ) {}

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
      `${environment.apiBaseUrl}/api/product/${id}`
    );
  }

  public getAllProducts(): Observable<ProductSpecificDetails[]> {
    return this.http.get<ProductSpecificDetails[]>(
      `${environment.apiBaseUrl}/api/product/all`
    );
  }

  // Products All Info __ Local Storage
  storageAllInfoForProduct(info: ProductAllInfo) {
    this.localStorage.store('product-all-Info', info);
    if (this.getAllInfo()) {
      this.router.navigateByUrl('/product');
    }
  }

  getAllInfo() {
    console.log(
      this.localStorage.retrieve('product-all-Info') + 'ahhhhhhhhhhhhhhh'
    );
    return this.localStorage.retrieve('product-all-Info');
  }

  public productAllInfo(productId: number, email: string) {
    return this.http.get<ProductAllInfo>(
      `${environment.apiBaseUrl}/api/product/${productId}/owner/${email}`
    );
  }

  public getProductsByCategory(category: string) {
    return this.http.get<ProductSpecificDetails[]>(
      `${environment.apiBaseUrl}/api/filter/${category}`
    );
  }

  public getProductsSorted(sort: string) {
    return this.http.get<ProductSpecificDetails[]>(
      `${environment.apiBaseUrl}/api/sort/${sort}`
    );
  }

  public editProduct(product: ProductEdit) {
    return this.http.post<void>(
      `${environment.apiBaseUrl}/api/product/edit`,
      product,
      {
        observe: 'events',
        reportProgress: true,
      }
    ); 
  }
}
