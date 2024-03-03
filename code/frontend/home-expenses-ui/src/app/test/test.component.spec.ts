/*
 * Author: Vladimir Vysokomornyi
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestComponent } from './test.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ConfigService } from '../services/config/config.service';
import { provideMockStore } from '@ngrx/store/testing';

describe('TestComponent', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestComponent],
      imports: [HttpClientTestingModule],
      providers: [ConfigService, provideMockStore({})]
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
