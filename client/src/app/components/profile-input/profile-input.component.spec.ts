import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileInputComponent } from './profile-input.component';

describe('ProfileInputComponent', () => {
  let component: ProfileInputComponent;
  let fixture: ComponentFixture<ProfileInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
