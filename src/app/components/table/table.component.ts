import { Component, OnInit } from '@angular/core';
import { Observable, forkJoin, combineLatest } from 'rxjs';
import { Employee } from 'src/app/interfaces/employee';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import Item from 'src/app/interfaces/item';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  employees: Observable<Employee[]>;

  constructor(private db: AngularFirestore) {}

  ngOnInit() {
    this.employees = combineLatest(
      this.getData<Employee>('employees'),
      this.getData('positions'),
      this.getData('departments')
    ).pipe(map(([employees, positions, departments]) => {
      return employees.map(e => {
        const position = positions.find(p => e.position === p.id);
        const department = departments.find(p => e.department === p.id);
        return {...e, position: position && position.name, department: department && department.name };
      });
    }));
  }

  getData<T = Item>(table: string) {
    return this.db
      .collection<T>(table)
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
}
