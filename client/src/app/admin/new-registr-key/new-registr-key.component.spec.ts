import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewRegistrKeyComponent } from './new-registr-key.component';

describe('NewRegistrKeyComponent', () => {
  let component: NewRegistrKeyComponent;
  let fixture: ComponentFixture<NewRegistrKeyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewRegistrKeyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewRegistrKeyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
