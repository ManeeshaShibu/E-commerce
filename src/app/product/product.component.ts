import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CartService } from '../cart/cart.service';
import { CartItem } from '../cart/cart.model';

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductGridComponent implements OnInit {
  productsArray: Product[] = [];
  cartItems: CartItem[] = [];

  constructor(private http: HttpClient, private cartService: CartService) { }

  ngOnInit() {
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
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }
}
