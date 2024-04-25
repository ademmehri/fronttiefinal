import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OffreajouterComponent } from './offreajouter.component';

describe('OffreajouterComponent', () => {
  let component: OffreajouterComponent;
  let fixture: ComponentFixture<OffreajouterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OffreajouterComponent]
    });
    fixture = TestBed.createComponent(OffreajouterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
