import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainuploadComponent } from './mainupload.component';

describe('MainuploadComponent', () => {
  let component: MainuploadComponent;
  let fixture: ComponentFixture<MainuploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainuploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainuploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
