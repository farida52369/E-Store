import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductResponse, ProductSpecificDetails } from 'src/app/dto/data';
import { environment } from 'src/environments/environment';
import { LocalStorageService } from 'ngx-webstorage';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class ProductService {
 
  constructor(private http: HttpClient, private localStorage: LocalStorageService, private router:Router) {}

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

  StorageAllInFoProduct(info : any){
     this.localStorage.store('allInfo' , info);
     if(this.getAllInfo() != undefined){
      this.router.navigateByUrl('/product'); 
     }
    
  }
  getAllInfo(){
    console.log(this.localStorage.retrieve('allInfo') + "ahhhhhhhhhhhhhhh");
    return this.localStorage.retrieve('allInfo');
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
