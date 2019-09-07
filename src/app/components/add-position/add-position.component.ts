import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-position',
  templateUrl: './add-position.component.html',
  styleUrls: ['./add-position.component.scss']
})
export class AddPositionComponent {
  form: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
  });

  constructor(private db: AngularFirestore, private router: Router) {}

  async add() {
    if (this.form.valid) {
      await this.db.collection('positions').add({ name: this.form.value.name });
      await this.back();
    }
  }

  back() {
    return this.router.navigate(['']);
  }
}
