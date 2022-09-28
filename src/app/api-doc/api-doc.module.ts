import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiDocComponent } from './api-doc.component';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { RequestComponent } from './components/request/request.component';

const routes: Routes = [
  { path: '', component: ApiDocComponent, data: {
      pageName: 'API', title: 'API integration - CactusManager',
      descript: 'API Documentation - Cactus Manager. Convenient key authorization for your users. Connection documentation.' 
    } 
  }
]


@NgModule({
  declarations: [
    ApiDocComponent,
    HeaderComponent,
    RequestComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class ApiDocModule { }
