import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksAndStationeryComponent } from './books-and-stationery.component';

describe('BooksAndStationeryComponent', () => {
  let component: BooksAndStationeryComponent;
  let fixture: ComponentFixture<BooksAndStationeryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BooksAndStationeryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BooksAndStationeryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
