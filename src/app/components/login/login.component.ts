import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  form: FormGroup = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  error = '';

  constructor(private afAuth: AngularFireAuth, private router: Router) {}

  login() {
    if (this.form.valid) {
      const val = this.form.value;
      this.afAuth.auth
        .signInWithEmailAndPassword(val.email, val.password)
        .then(() => (this.error = ''))
        .catch(err => (this.error = err.message));
    }
  }

  register() {
    if (this.form.valid) {
      const val = this.form.value;
      this.afAuth.auth
        .createUserWithEmailAndPassword(val.email, val.password)
        .then(() => (this.error = ''))
        .catch(err => (this.error = err.message));
    }
  }
}
