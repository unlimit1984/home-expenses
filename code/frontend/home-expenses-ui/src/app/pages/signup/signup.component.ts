import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { signupStart } from '../../store/auth/auth.actions';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  public form: FormGroup;

  constructor(private fb: FormBuilder, private store: Store) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      email: this.fb.control('', [Validators.required]),
      password: this.fb.control('', [Validators.required]),
      repeatedPassword: this.fb.control('', [Validators.required])
    });
  }

  signupStart() {
    if (this.form.valid && this.form.controls['password'].value === this.form.controls['repeatedPassword'].value) {
      this.store.dispatch(
        signupStart({
          credentials: {
            email: this.form.controls['email'].value,
            password: this.form.controls['password'].value
          }
        })
      );
    }
  }
}
