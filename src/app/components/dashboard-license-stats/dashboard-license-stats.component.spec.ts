import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardLicenseStatsComponent } from './dashboard-license-stats.component';

describe('DashboardLicenseStatsComponent', () => {
  let component: DashboardLicenseStatsComponent;
  let fixture: ComponentFixture<DashboardLicenseStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardLicenseStatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardLicenseStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
