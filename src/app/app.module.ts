import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductGridComponent } from '../app/product/product.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ProductDetailsComponent } from '../app/productdetails/productdetails.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProductService } from './service/product.service';
import { AuthService } from './service/authservice';
import { PaginationComponent } from './pagination.component';


@NgModule({
  declarations: [
    AppComponent,
    ProductGridComponent,
    ProductDetailsComponent,
    ProductEditComponent,
    PaginationComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,

    
  ],
  providers: [ProductService,AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
