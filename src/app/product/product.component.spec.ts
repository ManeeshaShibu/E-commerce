import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductGridComponent } from './product.component';

describe('ProductComponent', () => {
  let component: ProductGridComponent;
  let fixture: ComponentFixture<ProductGridComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductGridComponent]
    });
    fixture = TestBed.createComponent(ProductGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
