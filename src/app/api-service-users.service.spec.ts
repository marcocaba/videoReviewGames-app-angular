import { TestBed } from '@angular/core/testing';

import { ApiServiceUsersService } from './api-service-users.service';

describe('ApiServiceUsersService', () => {
  let service: ApiServiceUsersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiServiceUsersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
