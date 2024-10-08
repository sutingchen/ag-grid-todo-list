import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { AgGridModule } from 'ag-grid-angular';
import { ReusableGridComponent } from './reusable-grid/reusable-grid.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AgGridModule.withComponents([]),
    ReactiveFormsModule,
  ],
  declarations: [AppComponent, HelloComponent, ReusableGridComponent],
  bootstrap: [AppComponent],
  entryComponents: [ReusableGridComponent],
})
export class AppModule {}
