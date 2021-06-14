import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanTrComponent } from './plan-tr.component';

describe('PlanTrComponent', () => {
  let component: PlanTrComponent;
  let fixture: ComponentFixture<PlanTrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanTrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanTrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
