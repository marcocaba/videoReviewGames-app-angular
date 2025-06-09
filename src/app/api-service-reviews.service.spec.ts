import { TestBed } from '@angular/core/testing';

import { ApiServiceReviewsService } from './api-service-reviews.service';

describe('ApiServiceReviewsService', () => {
  let service: ApiServiceReviewsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiServiceReviewsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
