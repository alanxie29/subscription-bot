import { TestBed } from '@angular/core/testing';

import { AuthGuardService } from './authGuard.service';

describe('AuthgardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthGuardService = TestBed.get(AuthGuardService);
    expect(service).toBeTruthy();
  });
});
