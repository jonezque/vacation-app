import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AddDepartmentComponent } from '../add-department/add-department.component';
import { AddPositionComponent } from '../add-position/add-position.component';
import { AddEmployeeComponent } from '../add-employee/add-employee.component';
import { DeleteDepartmentComponent } from '../delete-department/delete-department.component';
import { DeleteEmployeeComponent } from '../delete-employee/delete-employee.component';
import { DeletePositionComponent } from '../delete-position/delete-position.component';

@Component({
  selector: 'app-toolbar-panel',
  templateUrl: './toolbar-panel.component.html',
  styleUrls: ['./toolbar-panel.component.scss']
})
export class ToolbarPanelComponent {

  constructor(public dialog: MatDialog) { }

  openDialog(action: string): void {
    let component = null;
    if (action === 'add-position') {
      component = AddPositionComponent;
    } else if (action === 'add-department') {
      component = AddDepartmentComponent;
    } else if (action === 'add-employee') {
      component = AddEmployeeComponent;
    } else if (action === 'delete-department') {
      component = DeleteDepartmentComponent;
    } else if (action === 'delete-employee') {
      component = DeleteEmployeeComponent;
    } else if (action === 'delete-position') {
      component = DeletePositionComponent;
    }
    const dialogRef = this.dialog.open(component, {
      width: '300px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
