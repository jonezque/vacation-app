import { NgModule } from '@angular/core';
import {
  MatCardModule,
  MatInputModule,
  MatButtonModule,
  MatMenuModule,
  MatCheckboxModule,
  MatDialogModule,
  MatSelectModule,
} from '@angular/material';

const modules = [
  MatCardModule,
  MatInputModule,
  MatButtonModule,
  MatMenuModule,
  MatCheckboxModule,
  MatDialogModule,
  MatSelectModule
];

@NgModule({
  imports: modules,
  exports: modules,
})
export class MaterialModule {}
