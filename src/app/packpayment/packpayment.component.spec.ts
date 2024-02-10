import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackpaymentComponent } from './packpayment.component';

describe('PackpaymentComponent', () => {
  let component: PackpaymentComponent;
  let fixture: ComponentFixture<PackpaymentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PackpaymentComponent]
    });
    fixture = TestBed.createComponent(PackpaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
