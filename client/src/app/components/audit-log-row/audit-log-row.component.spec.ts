import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditLogRowComponent } from './audit-log-row.component';

describe('AuditLogRowComponent', () => {
  let component: AuditLogRowComponent;
  let fixture: ComponentFixture<AuditLogRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuditLogRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuditLogRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
