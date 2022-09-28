import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FailedLoadComponent } from './failed-load.component';



@NgModule({
  declarations: [
    FailedLoadComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [FailedLoadComponent]
})
export class FailedLoadModule { }
