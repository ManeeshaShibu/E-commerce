import { Component } from '@angular/core';
import { ProductService } from '../app/service/product.service';
import { HttpClient } from '@angular/common/http';
import { CartService } from '../app/cart/cart.service';
import { CartItem } from '../app/cart/cart.model';
import { AuthService } from './service/authservice';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isLoggedIn: boolean = false;
  error: string = '';
  cartItems: CartItem[] = [];
  loginObj: any = {
    "UserName": "",
    "Password": ""
  };

  constructor(private productService: ProductService, private http: HttpClient, private cartService: CartService, private authService: AuthService, private router: Router) {
    this.cartItems = this.cartService.getCartItems();
    this.isLoggedIn = this.authService.isLoggedIn();
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/home']); 
    }
    }

  onLogin() {
    this.authService.login(this.loginObj).subscribe(
      () => {
        this.isLoggedIn = true;
      },
      error => {
        console.error('Login error:', error);
      }
    );
  }

  onLogout() {
    this.authService.logout();
    this.isLoggedIn = false;
  }
  addToCart(product: any) {
    this.cartService.addToCart(product);
    this.cartItems = this.cartService.getCartItems();
  }

  removeFromCart(item: CartItem, event: Event) {
    event.stopPropagation();
    this.cartService.removeFromCart(item);
    this.cartItems = this.cartService.getCartItems();
  }

  getUniqueCartItems(): { item: CartItem, count: number }[] {
    const uniqueItemsMap = new Map<number, { item: CartItem, count: number }>();
    this.cartItems.forEach(item => {
      if (uniqueItemsMap.has(item.id)) {
        const existingItem = uniqueItemsMap.get(item.id)!;
        existingItem.count++;
        uniqueItemsMap.set(item.id, existingItem);
      } else {
        uniqueItemsMap.set(item.id, { item: item, count: 1 });
      }
    });
    return Array.from(uniqueItemsMap.values());
  }

  getUniqueProductCount(): number {
    return this.cartItems.length;
  }

  calculateTotalPrice(): number {
    return this.cartItems.reduce((total, item) => total + item.price, 0);
  }
}
