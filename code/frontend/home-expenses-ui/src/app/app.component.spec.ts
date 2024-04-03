/*
 * Author: Vladimir Vysokomornyi
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { provideMockStore } from '@ngrx/store/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ConfigService } from './services/config/config.service';
import { HeaderComponent } from './header/header.component';
import { By } from '@angular/platform-browser';

const mockConfigService: any = {
  config: {
    featureFlags: { multiTabMode: true }
  }
};
describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let componentRender: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent, HeaderComponent],
      imports: [RouterTestingModule, ReactiveFormsModule, HttpClientTestingModule],
      providers: [
        {
          provide: ConfigService,
          useValue: mockConfigService
        },
        provideMockStore({})
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    componentRender = fixture.nativeElement;
  });

  it('should create the app', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
    expect(componentRender).toMatchSnapshot();
  });

  it('app should be available', () => {
    component.isAppAvailable = true;

    fixture.detectChanges();
    expect(componentRender).toMatchSnapshot();

    const warning = fixture.debugElement.query(By.css('[data-test-id="warning"]'));
    expect(warning).toBeNull();
  });

  xit('app should be unavailable', () => {
    component.isAppAvailable = false;

    fixture.detectChanges();
    expect(componentRender).toMatchSnapshot();

    const warning = fixture.debugElement.query(By.css('[data-test-id="warning"]'));
    expect(warning).toBeTruthy();
  });
});
