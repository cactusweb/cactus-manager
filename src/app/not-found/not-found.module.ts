import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './not-found.component';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  { path: '', component: NotFoundComponent, data: {
      title: '404 - CactusManager',
      descript: 'Not Found - Cactus Manager. Page not found - Go to Home.'
    }
  }
]


@NgModule({
  declarations: [
    NotFoundComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class NotFoundModule { }
