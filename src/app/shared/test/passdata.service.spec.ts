import { TestBed } from '@angular/core/testing';

import { PassDataService } from '../passdata.service';

describe('PassdataService', () => {
  let service: PassDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PassDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
