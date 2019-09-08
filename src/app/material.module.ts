import { NgModule } from '@angular/core';
import {
  MatCardModule,
  MatInputModule,
  MatButtonModule,
  MatMenuModule,
  MatCheckboxModule,
  MatDialogModule
} from '@angular/material';

const modules = [
  MatCardModule,
  MatInputModule,
  MatButtonModule,
  MatMenuModule,
  MatCheckboxModule,
  MatDialogModule
];

@NgModule({
  imports: modules,
  exports: modules,
})
export class MaterialModule {}
