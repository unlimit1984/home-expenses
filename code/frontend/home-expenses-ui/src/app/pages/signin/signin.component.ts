/*
 * Author: Vladimir Vysokomornyi
 */

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { signin } from '../../store/auth/auth.actions';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  public form: FormGroup;

  constructor(private fb: FormBuilder, private store: Store) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      email: this.fb.control('', [
        Validators.required,
        Validators.email,
        Validators.minLength(5),
        Validators.maxLength(100)
      ]),
      password: this.fb.control('', [Validators.required, Validators.minLength(1), Validators.maxLength(100)])
    });
  }

  login() {
    if (this.form.valid) {
      this.store.dispatch(
        signin({
          credentials: {
            email: this.form.controls['email'].value,
            password: this.form.controls['password'].value
          }
        })
      );
    }
  }
}
