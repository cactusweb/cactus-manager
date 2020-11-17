import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerApiComponent } from './owner-api.component';

describe('OwnerApiComponent', () => {
  let component: OwnerApiComponent;
  let fixture: ComponentFixture<OwnerApiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OwnerApiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnerApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
