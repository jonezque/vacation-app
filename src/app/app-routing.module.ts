import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AddDepartmentComponent } from './components/add-department/add-department.component';
import { DeleteDepartmentComponent } from './components/delete-department/delete-department.component';
import { AddEmployeeComponent } from './components/add-employee/add-employee.component';
import { DeleteEmployeeComponent } from './components/delete-employee/delete-employee.component';
import { AddPositionComponent } from './components/add-position/add-position.component';
import { DeletePositionComponent } from './components/delete-position/delete-position.component';

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'add-department', component: AddDepartmentComponent },
  { path: 'delete-department', component: DeleteDepartmentComponent },
  { path: 'add-employee', component: AddEmployeeComponent },
  { path: 'delete-employee', component: DeleteEmployeeComponent },
  { path: 'add-position', component: AddPositionComponent },
  { path: 'delete-position', component: DeletePositionComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
