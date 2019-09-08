import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent {
  form: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
  });

  constructor(private db: AngularFirestore, private dialogRef: MatDialogRef<AddEmployeeComponent>) {}

  async add() {
    if (this.form.valid) {
      await this.db.collection('positions').add({ name: this.form.value.name });
      this.dialogRef.close();
    }
  }
}
