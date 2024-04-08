/*
 * Author: Vladimir Vysokomornyi
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsComponent } from './settings.component';
import { TranslateModule } from '@ngx-translate/core';
import { ConfigService } from '../../services/config/config.service';

const mockConfigService: any = {
  setSelectedLanguage: (lang: string) => jest.fn(),
  getSelectedLanguage: jest.fn()
};

describe('SettingsComponent', () => {
  let component: SettingsComponent;
  let fixture: ComponentFixture<SettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SettingsComponent],
      imports: [TranslateModule.forRoot()],
      providers: [
        {
          provide: ConfigService,
          useValue: mockConfigService
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
