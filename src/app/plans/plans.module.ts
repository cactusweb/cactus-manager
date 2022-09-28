import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlansComponent } from './plans.component';
import { PlanFormComponent } from './components/plan-form/plan-form.component';
import { HeaderComponent } from './components/header/header.component';
import { ToolsModule } from '../tools/tools.module';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PlanComponent } from './components/plan/plan.component';
import { NgxSpinnerModule } from 'ngx-spinner';



@NgModule({
  declarations: [
    PlansComponent,
    PlanFormComponent,
    HeaderComponent,
    PlanComponent
  ],
  imports: [
    CommonModule,
    ToolsModule,
    ScrollingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule
  ],
  exports: [PlansComponent]
})
export class PlansModule { }
