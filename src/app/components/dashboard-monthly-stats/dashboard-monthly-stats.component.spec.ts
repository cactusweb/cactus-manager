import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardMonthlyStatsComponent } from './dashboard-monthly-stats.component';

describe('DashboardMonthlyStatsComponent', () => {
  let component: DashboardMonthlyStatsComponent;
  let fixture: ComponentFixture<DashboardMonthlyStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardMonthlyStatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardMonthlyStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
