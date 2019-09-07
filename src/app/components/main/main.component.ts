import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {
  user: firebase.User;
  userSubscription: Subscription;

  constructor(private afAuth: AngularFireAuth, private router: Router) {}

  ngOnInit() {
    this.userSubscription = this.afAuth.user.pipe(take(1)).subscribe(async user => {
      this.user = user;
      if (user) {
        if (!user.displayName) {
          this.router.navigate(['profile']);
        }
      }
    });
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

}
