import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilemployeeComponent } from './profilemployee.component';

describe('ProfilemployeeComponent', () => {
  let component: ProfilemployeeComponent;
  let fixture: ComponentFixture<ProfilemployeeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfilemployeeComponent]
    });
    fixture = TestBed.createComponent(ProfilemployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
