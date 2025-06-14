import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { liquorStoreOwnerGuardGuard } from './liquor-store-owner.guard';

describe('liquorStoreOwnerGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
      TestBed.runInInjectionContext(() => liquorStoreOwnerGuardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
