import { TestBed } from '@angular/core/testing';

import { AuthenticationService } from './authentication.service';

describe('Authentication.Service.TsService', () => {
  let service: AuthenticationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthenticationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
