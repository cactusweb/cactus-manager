import { NgModule } from '@angular/core';
import { NftVerificationComponent } from './nft-verification.component';
import { Route, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToolsModule } from '../tools/tools.module';

const route: Route = {
  path: '',
  component: NftVerificationComponent,
  data: {
    pageName: 'NFT Verification',
    title: 'NFT Verification - CactusManager',
    descript:
      'NFT Verification - Cactus Manager. Setup receiving of licenses by NFT for your users.',
  },
};

@NgModule({
  declarations: [NftVerificationComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([route]),
    FormsModule,
    ReactiveFormsModule,
    ToolsModule,
  ],
})
export class NftVerificationModule {}
