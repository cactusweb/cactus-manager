import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LicenseFormComponent } from './license-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToolsModule } from 'src/app/tools/tools.module';
import { LicenseKeyComponent } from './components/license-key/license-key.component';



@NgModule({
  declarations: [
    LicenseFormComponent,
    LicenseKeyComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ToolsModule
  ],
  exports: [LicenseFormComponent]
})
export class LicenseFormModule { }
