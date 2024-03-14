import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../service/product.service';
import { CartService } from '../cart/cart.service';
import { CartItem } from '../cart/cart.model';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Product } from '../product/product.model';
import { AuthService } from '../service/authservice'; 


@Component({
  selector: 'app-product-details',
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.css']
})
export class ProductDetailsComponent implements OnInit {
  productId: string = '';
  product: any = {};
  editMode: boolean = false;
  editedProduct: any = {};
  cartItems: CartItem[] = [];
  isLoading: boolean = false;
  isLoggedIn: boolean = false; 

  constructor(private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private router: Router,
    private authService: AuthService) { } // Inject AuthService

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.productId = id !== null ? id : '';
    console.log('Product ID:', this.productId);
    this.getProductDetails();
    this.cartItems = this.cartService.getCartItems();

    // Check if user is logged in
    this.isLoggedIn = this.authService.isLoggedIn();
  }

  getProductDetails() {
    console.log('Fetching product details...');
    this.isLoading = true;
    this.productService.getProductById(this.productId)
      .subscribe(
        (response: Product) => {
          console.log('API response:', response);
          this.product = response;
          console.log('Product:', this.product);
          this.editedProduct = { ...response };
        },
        (error: HttpErrorResponse) => {
          console.error('Error fetching product details:', error);
        },
        () => {
          this.isLoading = false;
        }
      );
  }

  toggleEditMode() {
    this.editMode = !this.editMode;
  }

  saveProductChanges() {
    console.log('Saving product changes...');

    if (this.product && this.product.id) {
      console.log('Product ID:', this.product.id);
      console.log('Updated Product:', this.editedProduct);

      const { id, ...updatedProductWithoutId } = this.editedProduct;

      this.isLoading = true;
      this.productService.updateProduct(this.product.id, updatedProductWithoutId)
        .subscribe(
          (updatedProduct: any) => {
            console.log('Product updated successfully:', updatedProduct);
            this.product = { ...this.product, ...updatedProduct };
            this.editMode = false;

            // Navigate to the product page upon successful update
            this.router.navigateByUrl(`/products/${this.product.id}`);
          },
          (error: HttpErrorResponse) => {
            console.error('Error updating product:', error);
          },
          () => {
            this.isLoading = false;
          }
        );
    } else {
      console.error('Cannot save changes: Product or Product ID is missing.');
    }
  }
  
  addToCart(product: any, event: MouseEvent) {
    // Prevent the default action of the click event
    event.preventDefault();

    // Add the loading class to the button
    const button = event.currentTarget as HTMLButtonElement;
    button.classList.add('loading');

    // Simulate a loading delay
    setTimeout(() => {
      // Add the product to the cart
      this.cartService.addToCart(product);
      
      // Get updated cart items
      this.cartItems = this.cartService.getCartItems();
      
      // Remove the loading class from the button
      button.classList.remove('loading');
    }, 3700);
  }
}