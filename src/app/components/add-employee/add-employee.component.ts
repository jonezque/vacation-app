import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatDialogRef } from '@angular/material';
import { Observable } from 'rxjs';
import Item from 'src/app/interfaces/item';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent implements OnInit {
  form: FormGroup = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    position: new FormControl(''),
    department: new FormControl(''),
  });

  departments: Observable<Item[]>;
  positions: Observable<Item[]>;

  constructor(private db: AngularFirestore, private dialogRef: MatDialogRef<AddEmployeeComponent>) {}

  ngOnInit() {
    this.departments = this.db.collection<Item>('departments').snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
    this.positions = this.db.collection<Item>('positions').snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  async add() {
    if (this.form.valid) {
      await this.db.collection('employees').add({
        firstName: this.form.value.firstName,
        lastName: this.form.value.lastName,
        displayName: this.form.value.lastName + ' ' + this.form.value.firstName,
        position: this.form.value.position,
        department: this.form.value.department,
      });

      this.dialogRef.close();
    }
  }
}
