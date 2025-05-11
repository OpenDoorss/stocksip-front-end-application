import { TestBed } from '@angular/core/testing';

import { CareGuideService } from './care-guide.service';

describe('CareGuideService', () => {
  let service: CareGuideService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CareGuideService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
