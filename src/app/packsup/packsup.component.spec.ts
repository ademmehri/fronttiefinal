import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PacksupComponent } from './packsup.component';

describe('PacksupComponent', () => {
  let component: PacksupComponent;
  let fixture: ComponentFixture<PacksupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PacksupComponent]
    });
    fixture = TestBed.createComponent(PacksupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
