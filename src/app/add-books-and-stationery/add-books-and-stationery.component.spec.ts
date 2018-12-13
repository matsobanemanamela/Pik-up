import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBooksAndStationeryComponent } from './add-books-and-stationery.component';

describe('AddBooksAndStationeryComponent', () => {
  let component: AddBooksAndStationeryComponent;
  let fixture: ComponentFixture<AddBooksAndStationeryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddBooksAndStationeryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBooksAndStationeryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
