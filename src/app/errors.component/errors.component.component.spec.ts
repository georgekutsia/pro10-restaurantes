import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorsComponentComponent } from './errors.component.component';

describe('ErrorsComponentComponent', () => {
  let component: ErrorsComponentComponent;
  let fixture: ComponentFixture<ErrorsComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ErrorsComponentComponent]
    });
    fixture = TestBed.createComponent(ErrorsComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
