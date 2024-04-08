/*
 * Author: Vladimir Vysokomornyi
 */

import { TestBed } from '@angular/core/testing';

import { ExpensesService } from './expenses.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ConfigService } from '../config/config.service';
import { provideMockStore } from '@ngrx/store/testing';
import { TranslateModule } from '@ngx-translate/core';

describe('ExpensesService', () => {
  let service: ExpensesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, TranslateModule.forRoot()],
      providers: [ConfigService, provideMockStore({})]
    });
    service = TestBed.inject(ExpensesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
