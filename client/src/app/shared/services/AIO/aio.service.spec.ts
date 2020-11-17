import { TestBed } from '@angular/core/testing';

import { AIOService } from './aio.service';

describe('AIOService', () => {
  let service: AIOService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AIOService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
