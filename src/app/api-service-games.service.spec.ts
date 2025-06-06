import { TestBed } from '@angular/core/testing';

import { ApiServiceGamesService } from './api-service-games.service';

describe('ApiServiceGamesService', () => {
  let service: ApiServiceGamesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiServiceGamesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
