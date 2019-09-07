import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  form: FormGroup = new FormGroup({
    displayName: new FormControl(''),
    email: new FormControl(''),
  });
  user: firebase.User;

  constructor(private afAuth: AngularFireAuth, private router: Router) {}

  ngOnInit() {
    this.afAuth.user.subscribe(user => {
      this.form.setValue({ displayName: user.displayName, email: user.email });
      this.user = user;
    });
  }

  async update() {
    if (this.form.valid) {
      await this.afAuth.auth.currentUser.updateProfile({ displayName: this.form.value.displayName });
      await this.back();
    }
  }

  back() {
    return this.router.navigate(['main']);
  }
}
