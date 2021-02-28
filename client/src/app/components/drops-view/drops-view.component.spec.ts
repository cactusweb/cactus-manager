import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DropsViewComponent } from './drops-view.component';

describe('DropsViewComponent', () => {
  let component: DropsViewComponent;
  let fixture: ComponentFixture<DropsViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DropsViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DropsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
