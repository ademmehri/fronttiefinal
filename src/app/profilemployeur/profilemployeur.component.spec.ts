import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilemployeurComponent } from './profilemployeur.component';

describe('ProfilemployeurComponent', () => {
  let component: ProfilemployeurComponent;
  let fixture: ComponentFixture<ProfilemployeurComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfilemployeurComponent]
    });
    fixture = TestBed.createComponent(ProfilemployeurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
