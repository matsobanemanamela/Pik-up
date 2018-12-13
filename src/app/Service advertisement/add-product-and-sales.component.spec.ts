import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProductAndSalesComponent } from './add-product-and-sales.component';

describe('AddProductAndSalesComponent', () => {
  let component: AddProductAndSalesComponent;
  let fixture: ComponentFixture<AddProductAndSalesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddProductAndSalesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProductAndSalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
