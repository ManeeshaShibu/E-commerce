import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../product/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http: HttpClient) { }

  getAllProducts(pageNumber: number, itemsPerPage: number): Observable<any> {
    const apiUrl = `https://dummyjson.com/products?_page=${pageNumber}&_limit=${itemsPerPage}`;
    return this.http.get<any[]>(apiUrl, { observe: 'response' });
  }

  getProductById(productId: string): Observable<Product> {
    return this.http.get<Product>('https://dummyjson.com/products/' + productId);
  }

  updateProduct(productId: string, updatedProduct: Partial<Product>): Observable<any> {
    const url = `https://dummyjson.com/products/${productId}`;
    return this.http.put<any>(url, updatedProduct);
  }
}
