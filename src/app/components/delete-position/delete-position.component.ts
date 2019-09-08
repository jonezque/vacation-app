import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import Item from 'src/app/interfaces/item';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { MatCheckboxChange, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-delete-position',
  templateUrl: './delete-position.component.html',
  styleUrls: ['./delete-position.component.scss']
})
export class DeletePositionComponent implements OnInit {
  positions: Observable<Item[]>;
  IdsToDelete: Map<string, boolean> = new Map();

  constructor(private db: AngularFirestore, private dialogRef: MatDialogRef<DeletePositionComponent>) {}

  ngOnInit() {
    this.positions = this.db.collection<Item>('positions').snapshotChanges().pipe(
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
    await Promise.all(ids.map(id => this.db.collection('positions').doc(id).delete()));
    this.dialogRef.close();
  }
}
