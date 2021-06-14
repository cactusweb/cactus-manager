import { TestBed } from '@angular/core/testing';

import { ToHomeGuard } from './to-home.guard';

describe('ToHomeGuard', () => {
  let guard: ToHomeGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ToHomeGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
