import { Component, ElementRef, TemplateRef, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { todoList } from './todos';
import { ReusableGridComponent } from './reusable-grid/reusable-grid.component';
import { ToDoModel } from './models';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor() {
    this.rowData = todoList;

    this.todosFormGroup = new FormGroup({
      todoList: new FormArray(this.loadData()),
    });
  }
  public rowData: ToDoModel[] = [];
  public gridApi: any;
  public columnDefs = [];
  toDoCount: number = 21; //21st todo item since we already have 20 ToDos

  @ViewChild('columnTemplate', { static: true })
  columnTemplate: TemplateRef<any>;

  priorityList: number[] = [0, 1, 2, 3];

  public defaultColDef = {
    autoHeight: true,
    resizable: true,
  };

  public todosFormGroup: FormGroup;

  get todosArray() {
    return <FormArray>this.todosFormGroup.get('todoList');
  }

  onGridReady(params) {
    this.gridApi = params.api;
    params.api.refreshCells({ force: true });
  }

  dataRendered(params) {
    params.api.sizeColumnsToFit();
  }

  add() {
    const newToDo: ToDoModel = {
      id: this.toDoCount++,
      userId: 1,
      title: 'Grocery',
      completed: false,
      priority: 0,
    };
    this.rowData.push(newToDo);

    (<FormArray>this.todosFormGroup.get('todoList')).push(
      this.createToDoItem(newToDo)
    );

    this.gridApi.setRowData(this.rowData);
  }

  refreshFormControls() {
    if (this.gridApi) {
      this.gridApi.refreshCells({ force: true });
    }
  }

  ngOnInit() {
    this.columnDefs = [
      {
        headerName: 'Title',
        cellRendererFramework: ReusableGridComponent,
        cellRendererParams: {
          ngTemplate: this.columnTemplate,
        },
      },
      {
        headerName: 'Priority',
        cellRendererFramework: ReusableGridComponent,
        cellRendererParams: {
          ngTemplate: this.columnTemplate,
        },
      },
      {
        headerName: 'Completed',
        cellRendererFramework: ReusableGridComponent,
        cellRendererParams: {
          ngTemplate: this.columnTemplate,
        },
      },
      {
        headerName: 'Action',
        cellRendererFramework: ReusableGridComponent,
        cellRendererParams: {
          ngTemplate: this.columnTemplate,
        },
      },
    ];
  }

  delete(rowIndex: number) {
    this.rowData.splice(rowIndex, 1);
    (<FormArray>this.todosFormGroup.get('todoList')).removeAt(rowIndex);
    this.gridApi.setRowData(this.rowData); //refreshFormControls will be called
  }

  loadData() {
    return this.rowData.map((todo: ToDoModel) => {
      return this.createToDoItem(todo);
    });
  }

  createToDoItem(todo: ToDoModel) {
    return new FormGroup({
      id: new FormControl(todo.id),
      title: new FormControl(todo.title),
      completed: new FormControl(todo.completed),
      priority: new FormControl(todo.priority),
    });
  }
}
