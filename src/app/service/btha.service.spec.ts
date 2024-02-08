import { TestBed } from '@angular/core/testing';

import { BTHAService } from './btha.service';

describe('BTHAService', () => {
  let service: BTHAService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BTHAService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
