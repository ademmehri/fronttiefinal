import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PetitcvComponent } from './petitcv.component';

describe('PetitcvComponent', () => {
  let component: PetitcvComponent;
  let fixture: ComponentFixture<PetitcvComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PetitcvComponent]
    });
    fixture = TestBed.createComponent(PetitcvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
