import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import Item from 'src/app/interfaces/item';
import { map } from 'rxjs/operators';
import { MatCheckboxChange, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-delete-department',
  templateUrl: './delete-department.component.html',
  styleUrls: ['./delete-department.component.scss']
})
export class DeleteDepartmentComponent implements OnInit {
  departments: Observable<Item[]>;
  IdsToDelete: Map<string, boolean> = new Map();

  constructor(private db: AngularFirestore, private dialogRef: MatDialogRef<DeleteDepartmentComponent>) {}

  ngOnInit() {
    this.departments = this.db.collection<Item>('departments').snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  valueChange(id: string, ev: MatCheckboxChange) {
    this.IdsToDelete.set(id, ev.checked);
}

  async delete() {
    const ids: Array<string> = [];
    this.IdsToDelete.forEach((v, k) => {
      if (v) {
        ids.push(k);
      }
    });
    await Promise.all(ids.map(id => this.db.collection('departments').doc(id).delete()));
    this.dialogRef.close();
  }
}
