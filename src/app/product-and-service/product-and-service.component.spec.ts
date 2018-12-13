import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductAndServiceComponent } from './product-and-service.component';

describe('ProductAndServiceComponent', () => {
  let component: ProductAndServiceComponent;
  let fixture: ComponentFixture<ProductAndServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductAndServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductAndServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
