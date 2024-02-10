import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatronprofilComponent } from './patronprofil.component';

describe('PatronprofilComponent', () => {
  let component: PatronprofilComponent;
  let fixture: ComponentFixture<PatronprofilComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PatronprofilComponent]
    });
    fixture = TestBed.createComponent(PatronprofilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
