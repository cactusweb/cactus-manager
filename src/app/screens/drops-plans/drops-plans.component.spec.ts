import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DropsPlansComponent } from './drops-plans.component';

describe('DropsPlansComponent', () => {
  let component: DropsPlansComponent;
  let fixture: ComponentFixture<DropsPlansComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DropsPlansComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DropsPlansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
