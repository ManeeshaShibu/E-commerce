import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductGridComponent } from '../app/product/product.component';
import { ProductDetailsComponent } from '../app/productdetails/productdetails.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { HomepageComponent } from './homepage/homepage.component';


const routes: Routes = [

  {
    path: 'home',
    component: HomepageComponent
  },
 
  {
    path: 'products',
    component: ProductGridComponent
  },
  {
    path: 'products/:id',
    component: ProductDetailsComponent
  },
  {
    path: 'products/:id/edit',
    component: ProductEditComponent
  },
  {
    path: '',
    redirectTo: '/products',
    pathMatch: 'full'
  },



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
