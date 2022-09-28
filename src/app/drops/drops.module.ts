import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropsComponent } from './drops.component';
import { RouterModule, Routes } from '@angular/router';
import { PlansModule } from '../plans/plans.module';
import { DropComponent } from './components/drop/drop.component';
import { DropFormComponent } from './components/drop-form/drop-form.component';
import { HeaderComponent } from './components/header/header.component';
import { ToolsModule } from '../tools/tools.module';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


const routes: Routes = [
  { path: '', component: DropsComponent, data: {
      pageName:"Drops", title: 'Drops - CactusManager',
      descript: 'Drops and plans - Cactus Manager. Create the drop and send it to your customers.'
    } 
  }
]


@NgModule({
  declarations: [
    DropsComponent,
    DropComponent,
    DropFormComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    PlansModule,
    ToolsModule,
    ScrollingModule,
    NgxSpinnerModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class DropsModule { }
