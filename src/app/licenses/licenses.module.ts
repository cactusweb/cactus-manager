import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { LicensesComponent } from './licenses.component';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToolsModule } from '../tools/tools.module';
import { LicenseRowComponent } from './components/license-row/license-row.component';
import { LicenseViewingModule } from './screens/license-viewing/license-viewing.module';
import { LicenseFormModule } from './screens/license-form/license-form.module';
import { FailedLoadModule } from '../failed-load/failed-load.module';

const routes: Routes = [
  { path: '', component: LicensesComponent, data: {
      pageName:"Licenses", title: 'Licenses manage - CactusManager',
      descript: 'License manager - Cactus Manager. View, editing, deliting of license keys and their activations. Get started now!'
    } 
  }
]

@NgModule({
  declarations: [
    LicensesComponent,
    HeaderComponent,
    LicenseRowComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ScrollingModule,
    ReactiveFormsModule,
    FormsModule,
    ToolsModule,
    LicenseViewingModule,
    LicenseFormModule,
  ]
})
export class LicensesModule { }
