import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PushmessageComponent } from './pushmessage.component';

describe('PushmessageComponent', () => {
  let component: PushmessageComponent;
  let fixture: ComponentFixture<PushmessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PushmessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PushmessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
