import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanGenComponent } from './plan-gen.component';

describe('PlanGenComponent', () => {
  let component: PlanGenComponent;
  let fixture: ComponentFixture<PlanGenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanGenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanGenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
