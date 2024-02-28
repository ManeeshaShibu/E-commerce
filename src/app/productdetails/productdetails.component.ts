import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../service/product.service';
import { CartService } from '../cart/cart.service'; 
import { CartItem } from '../cart/cart.model';

@Component({
  selector: 'app-product-details',
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.css']
})
export class ProductDetailsComponent implements OnInit {
  productId: string = '';
  product: any = {}; 
  cartItems: CartItem[] = [];

  constructor(private route: ActivatedRoute, 
              private productService: ProductService,
              private cartService: CartService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.productId = id !== null ? id : '';
    console.log('Product ID:', this.productId);
    this.getProductDetails();
  }

  getProductDetails(): void {
    console.log('Fetching product details...');
    this.productService.getProductById(this.productId)
      .subscribe(
        (response: any) => {
          console.log('API response:', response);
          this.product = response || {}; 
          console.log('Product:', this.product);
        },
        (error: any) => { 
          console.error('Error fetching product details:', error);
        }
      );
  }

  addToCart(product: any) {
    this.cartService.addToCart(product); 
    this.cartItems = this.cartService.getCartItems(); 
  }

  updateProductTitle(updatedTitle: string) {
    if (this.product) { 
      const productId = this.product.id;
      this.productService.updateProductTitle(productId, updatedTitle)
        .subscribe(
          (response: any) => {
            console.log('Product title updated successfully:', response);
            this.product.title = updatedTitle;
          },
          (error: any) => {
            console.error('Error updating product title:', error);
          }
        );
    }
  }
}