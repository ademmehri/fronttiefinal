import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagepatronComponent } from './pagepatron.component';

describe('PagepatronComponent', () => {
  let component: PagepatronComponent;
  let fixture: ComponentFixture<PagepatronComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PagepatronComponent]
    });
    fixture = TestBed.createComponent(PagepatronComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
