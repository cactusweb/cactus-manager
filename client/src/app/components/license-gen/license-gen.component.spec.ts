import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LicenseGenComponent } from './license-gen.component';

describe('LicenseGenComponent', () => {
  let component: LicenseGenComponent;
  let fixture: ComponentFixture<LicenseGenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LicenseGenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LicenseGenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
