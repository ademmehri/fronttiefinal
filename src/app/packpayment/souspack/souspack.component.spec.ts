import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SouspackComponent } from './souspack.component';

describe('SouspackComponent', () => {
  let component: SouspackComponent;
  let fixture: ComponentFixture<SouspackComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SouspackComponent]
    });
    fixture = TestBed.createComponent(SouspackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
