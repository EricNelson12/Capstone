import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestpostComponent } from './guestpost.component';

describe('GuestpostComponent', () => {
  let component: GuestpostComponent;
  let fixture: ComponentFixture<GuestpostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuestpostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuestpostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
