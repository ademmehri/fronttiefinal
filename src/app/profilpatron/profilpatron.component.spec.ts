import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilpatronComponent } from './profilpatron.component';

describe('ProfilpatronComponent', () => {
  let component: ProfilpatronComponent;
  let fixture: ComponentFixture<ProfilpatronComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfilpatronComponent]
    });
    fixture = TestBed.createComponent(ProfilpatronComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
