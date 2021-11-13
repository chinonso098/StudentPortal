import { TestBed } from '@angular/core/testing';

import { UnsavedchangeGuard } from './unsavedchange.guard';

describe('UnsavedchangeGuard', () => {
  let guard: UnsavedchangeGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(UnsavedchangeGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
