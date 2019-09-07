import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  user: firebase.User;

  constructor(private afAuth: AngularFireAuth, private router: Router) {}

  ngOnInit() {
    this.afAuth.user.pipe().subscribe(async user => {
      this.user = user;
      const path = user ? '' : 'login';
      await this.moveTo(path);
    });
  }

  moveTo(path: string) {
    return this.router.navigate([path]);
  }
}
