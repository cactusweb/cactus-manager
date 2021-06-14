import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RolesChoosingComponent } from './roles-choosing.component';

describe('RolesChoosingComponent', () => {
  let component: RolesChoosingComponent;
  let fixture: ComponentFixture<RolesChoosingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RolesChoosingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RolesChoosingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
