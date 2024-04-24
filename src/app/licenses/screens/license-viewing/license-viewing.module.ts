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
import { NftDataEditComponent } from './components/nft-data-edit/nft-data-edit.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    LicenseViewingComponent,
    LabelComponent,
    UserDataComponent,
    NftDataComponent,
    NftDataEditComponent,
  ],
  imports: [
    CommonModule,
    ToolsModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [LicenseViewingComponent],
})
export class LicenseViewingModule {}
