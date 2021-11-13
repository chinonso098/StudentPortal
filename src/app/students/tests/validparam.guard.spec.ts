import { TestBed } from '@angular/core/testing';

import { ValidparamGuard } from '../../shared/validparam.guard';

describe('ValidparamGuard', () => {
  let guard: ValidparamGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ValidparamGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
