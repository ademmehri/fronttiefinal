import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NextformComponent } from './nextform.component';

describe('NextformComponent', () => {
  let component: NextformComponent;
  let fixture: ComponentFixture<NextformComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NextformComponent]
    });
    fixture = TestBed.createComponent(NextformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
