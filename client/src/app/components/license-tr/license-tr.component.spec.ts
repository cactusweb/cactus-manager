import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LicenseTrComponent } from './license-tr.component';

describe('LicenseTrComponent', () => {
  let component: LicenseTrComponent;
  let fixture: ComponentFixture<LicenseTrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LicenseTrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LicenseTrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
