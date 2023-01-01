import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductSpecificDetails } from 'src/app/dto/data';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient) { }

  getProductsByWord(word: string): Observable<ProductSpecificDetails[]> {
    return this.http.get<ProductSpecificDetails[]>(
      `${environment.apiBaseUrl}/api/search/${word}`
    );
  }
}
