import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CartService } from '../cart/cart.service';
import { CartItem } from '../cart/cart.model';
import { Product } from '../product/product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductGridComponent implements OnInit {
  productsArray: Product[] = [];
  cartItems: CartItem[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages: number = 1;

  constructor(private http: HttpClient, private cartService: CartService) { }

  ngOnInit() {
    this.fetchProducts();
  }

  fetchProducts() {
    this.http.get<any>('https://dummyjson.com/products').subscribe(
      (data) => {
        this.productsArray = data.products.map((product: any) => ({
          id: product.id,
          title: product.title,
          description: product.description,
          price: product.price,
          discountPercentage: product.discountPercentage,
          rating: product.rating,
          stock: product.stock,
          brand: product.brand,
          category: product.category,
          thumbnail: product.thumbnail,
          images: product.images
        }));
        console.log('Products:', this.productsArray);
        this.totalPages = Math.ceil(this.productsArray.length / this.itemsPerPage);
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }

  getDisplayedProducts(): Product[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.productsArray.slice(startIndex, endIndex);
  }

  onPageChange(page: number) {
    this.currentPage = page;
  }
}
