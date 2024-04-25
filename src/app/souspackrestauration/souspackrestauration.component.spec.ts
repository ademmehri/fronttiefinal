import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SouspackrestaurationComponent } from './souspackrestauration.component';

describe('SouspackrestaurationComponent', () => {
  let component: SouspackrestaurationComponent;
  let fixture: ComponentFixture<SouspackrestaurationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SouspackrestaurationComponent]
    });
    fixture = TestBed.createComponent(SouspackrestaurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
