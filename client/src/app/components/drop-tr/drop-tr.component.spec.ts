import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DropTrComponent } from './drop-tr.component';

describe('DropTrComponent', () => {
  let component: DropTrComponent;
  let fixture: ComponentFixture<DropTrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DropTrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DropTrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
