/*
 * Author: Vladimir Vysokomornyi
 */

import { TestBed } from '@angular/core/testing';

import { AuthApiService } from './auth-api.service';

describe('AuthService', () => {
  let service: AuthApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthApiService);
  });

  xit('should be created', () => {
    expect(service).toBeTruthy();
  });
});
