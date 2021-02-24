import { TestBed } from '@angular/core/testing';

import { PlaidAccountService } from './plaid-account.service';

describe('PlaidAccountService', () => {
  let service: PlaidAccountService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlaidAccountService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
