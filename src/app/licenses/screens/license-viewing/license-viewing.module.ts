import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LicenseViewingComponent } from './license-viewing.component';
import { LabelComponent } from './components/label/label.component';
import { UserDataComponent } from './components/user-data/user-data.component';
import { ToolsModule } from 'src/app/tools/tools.module';



@NgModule({
  declarations: [
    LicenseViewingComponent,
    LabelComponent,
    UserDataComponent
  ],
  imports: [
    CommonModule,
    ToolsModule
  ],
  exports: [LicenseViewingComponent]
})
export class LicenseViewingModule { }
