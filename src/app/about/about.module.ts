import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AboutComponent } from './about.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FileDropzoneComponent } from '../common/components/file-dropzone/file-dropzone.component';
import { AboutActionComponent } from './components/action/action.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [AboutComponent, AboutActionComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: AboutComponent,
        data: {
          pageName: 'About',
          title: 'About project - CactusManager',
        },
      },
    ]),
    FormsModule,
    ReactiveFormsModule,
    FileDropzoneComponent,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    NgxSpinnerModule,
  ],
})
export class AboutModule {}
