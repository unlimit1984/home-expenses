import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpensesComponent } from './expenses.component';
import { TranslateModule } from '@ngx-translate/core';
import { provideMockStore } from '@ngrx/store/testing';

describe('ExpensesComponent', () => {
  let component: ExpensesComponent;
  let fixture: ComponentFixture<ExpensesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExpensesComponent],
      imports: [TranslateModule.forRoot()],
      providers: [provideMockStore({})]
    }).compileComponents();

    fixture = TestBed.createComponent(ExpensesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
