import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatepComponent } from './updatep.component';

describe('UpdatepComponent', () => {
  let component: UpdatepComponent;
  let fixture: ComponentFixture<UpdatepComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdatepComponent]
    });
    fixture = TestBed.createComponent(UpdatepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
