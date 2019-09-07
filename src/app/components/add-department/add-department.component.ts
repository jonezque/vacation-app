import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-add-department',
  templateUrl: './add-department.component.html',
  styleUrls: ['./add-department.component.scss']
})
export class AddDepartmentComponent {
  form: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
  });

  constructor(private db: AngularFirestore, private router: Router) {}

  async add() {
    if (this.form.valid) {
      await this.db.collection('departments').add({ name: this.form.value.name });
      await this.back();
    }
  }

  back() {
    return this.router.navigate(['']);
  }
}
