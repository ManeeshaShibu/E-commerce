import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<any[]> {
    return this.http.get<any[]>('https://dummyjson.com/products');
  }

  getProductById(productId: string): Observable<any> {
    return this.http.get<any>('https://dummyjson.com/products/' + productId);
  }
  updateProductTitle(productId: string, updatedTitle: string): Observable<any> {
    const url = `https://dummyjson.com/products/${productId}`;
    return this.http.put<any>(url, { title: updatedTitle });
  }
}  
 