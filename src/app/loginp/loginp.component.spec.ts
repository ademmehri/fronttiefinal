import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginpComponent } from './loginp.component';

describe('LoginpComponent', () => {
  let component: LoginpComponent;
  let fixture: ComponentFixture<LoginpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginpComponent]
    });
    fixture = TestBed.createComponent(LoginpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
