import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageoffreemployeurComponent } from './pageoffreemployeur.component';

describe('PageoffreemployeurComponent', () => {
  let component: PageoffreemployeurComponent;
  let fixture: ComponentFixture<PageoffreemployeurComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PageoffreemployeurComponent]
    });
    fixture = TestBed.createComponent(PageoffreemployeurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
