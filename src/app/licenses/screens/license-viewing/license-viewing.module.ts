import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LicenseViewingComponent } from './license-viewing.component';
import { LabelComponent } from './components/label/label.component';
import { UserDataComponent } from './components/user-data/user-data.component';
import { ToolsModule } from 'src/app/tools/tools.module';
import { NftDataComponent } from './components/nft-data/nft-data.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [
    LicenseViewingComponent,
    LabelComponent,
    UserDataComponent,
    NftDataComponent,
  ],
  imports: [
    CommonModule,
    ToolsModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
  ],
  exports: [LicenseViewingComponent],
})
export class LicenseViewingModule {}
