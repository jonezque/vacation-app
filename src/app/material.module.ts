import { NgModule } from '@angular/core';
import {
  MatCardModule,
  MatInputModule,
  MatButtonModule,
  MatMenuModule,
  MatCheckboxModule
} from '@angular/material';

const modules = [
  MatCardModule,
  MatInputModule,
  MatButtonModule,
  MatMenuModule,
  MatCheckboxModule
];

@NgModule({
  imports: modules,
  exports: modules,
})
export class MaterialModule {}
