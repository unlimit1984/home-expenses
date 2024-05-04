import { TestBed } from '@angular/core/testing';

import { PredefinedTranslationsService } from './predefined-translations.service';
import { TranslateModule } from '@ngx-translate/core';

describe('PredefinedTranslationsService', () => {
  let service: PredefinedTranslationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [TranslateModule.forRoot()] });
    service = TestBed.inject(PredefinedTranslationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
