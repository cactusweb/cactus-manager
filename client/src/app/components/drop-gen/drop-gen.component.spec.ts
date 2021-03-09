import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DropGenComponent } from './drop-gen.component';

describe('DropGenComponent', () => {
  let component: DropGenComponent;
  let fixture: ComponentFixture<DropGenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DropGenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DropGenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
