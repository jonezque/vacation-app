import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent {
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
