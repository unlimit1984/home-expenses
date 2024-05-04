/*
 * Author: Vladimir Vysokomornyi
 */

import { TestBed } from '@angular/core/testing';

import { MondayAsFirstDayOfWeekAdapter } from './monday-as-first-day-of-week.adapter';

describe('MondayAsFirstDayOfWeekAdapter', () => {
  let service: MondayAsFirstDayOfWeekAdapter;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MondayAsFirstDayOfWeekAdapter);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
