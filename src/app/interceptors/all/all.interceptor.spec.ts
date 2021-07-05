import { TestBed } from '@angular/core/testing';

import { AllInterceptor } from './all.interceptor';

describe('AllInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      AllInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: AllInterceptor = TestBed.inject(AllInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
