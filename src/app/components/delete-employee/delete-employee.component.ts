import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatDialogRef, MatCheckboxChange } from '@angular/material';
import { Observable } from 'rxjs';
import { DeleteDepartmentComponent } from '../delete-department/delete-department.component';
import { map } from 'rxjs/operators';
import { Employee } from 'src/app/interfaces/employee';

@Component({
  selector: 'app-delete-employee',
  templateUrl: './delete-employee.component.html',
  styleUrls: ['./delete-employee.component.scss'],
})
export class DeleteEmployeeComponent implements OnInit {
  employees: Observable<Employee[]>;
  IdsToDelete: Map<string, boolean> = new Map();

  constructor(
    private db: AngularFirestore,
    private dialogRef: MatDialogRef<DeleteDepartmentComponent>
  ) {}

  ngOnInit() {
    this.employees = this.db
      .collection<Employee>('employees')
      .snapshotChanges()
      .pipe(
        map(actions =>
          actions.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data };
          })
        )
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
    await Promise.all(
      ids.map(id =>
        this.db
          .collection('employees')
          .doc(id)
          .delete()
      )
    );
    this.dialogRef.close();
  }
}
