import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantGestionComponent } from './restaurant-gestion.component';

describe('RestaurantGestionComponent', () => {
  let component: RestaurantGestionComponent;
  let fixture: ComponentFixture<RestaurantGestionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RestaurantGestionComponent]
    });
    fixture = TestBed.createComponent(RestaurantGestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
