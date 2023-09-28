import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RyodanApplicationsComponent } from './ryodan-applications/applications.component';
import { RyodanCustomizationComponent } from './ryodan-customization.component';
import { RyodanReportsComponent } from './ryodan-reports/reports.component';
import RyodanHeaderComponent from './common/components/header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RyodanPopupComponent } from './common/components/popup/popup.component';
import { RyodanHttpService } from './common/services/ryodan-http.service';
import { HttpService } from '../tools/services/http.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { Interceptor } from '../tools/services/interceptor';
import { RyodanCustomizationInterceptor } from './common/interceptors/ryodan-customization.intercepter';
import { RyodanDataService } from './common/services/ryodan-data.service';
import { RyodanApplicationComponent } from './ryodan-applications/components/application/application.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { ToolsModule } from '../tools/tools.module';
import { RyodanApplicationRowComponent } from './ryodan-applications/components/application-row/application-row.component';
import { RyodanReportComponent } from './ryodan-reports/components/report/report.component';
import { RyodanReportRowComponent } from './ryodan-reports/components/report-row/report-row.component';
import { RyodanHeaderService } from './common/services/ryodan-header.service';
import { RyodanLabelComponent } from './common/components/label/label.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { RyodanMetamasksComponent } from './ryodan-metamasks/metamasks.component';
import RyodanMmHeaderComponent from './ryodan-metamasks/components/header/header.component';
import { RyodanMmHeaderService } from './ryodan-metamasks/components/header/header.service';
import { RyodanMetamasksFormComponent } from './ryodan-metamasks/components/metamasks-form/metamasks-form.component';
import { RyodanMmUserRowComponent } from './ryodan-metamasks/components/mm-user-row/mm-user-row.component';
import { RyodanMmUserComponent } from './ryodan-metamasks/components/mm-user/mm-user.component';
import { RyodanWalletRowComponent } from './ryodan-metamasks/components/mm-user/wallet-row/wallet-row.component';

const routes: Routes = [
  {
    path: '',
    component: RyodanCustomizationComponent,
    children: [
      {
        path: 'applications',
        component: RyodanApplicationsComponent,
        data: {
          pageName: 'Ryodan - Applications',
          title: 'Applications - CactusManager',
        },
      },
      {
        path: 'reports',
        component: RyodanReportsComponent,
        data: {
          pageName: 'Ryodan - Reports',
          title: 'Reports - CactusManager',
        },
      },
      {
        path: 'metamasks',
        component: RyodanMetamasksComponent,
        data: {
          pageName: 'Ryodan - Metamasks',
          title: 'Metamasks - CactusManager',
        },
      },
      {
        path: '**',
        redirectTo: 'reports',
      },
    ],
  },
];

@NgModule({
  declarations: [
    RyodanCustomizationComponent,
    RyodanApplicationsComponent,
    RyodanApplicationComponent,
    RyodanHeaderComponent,
    RyodanPopupComponent,
    RyodanApplicationRowComponent,
    RyodanReportsComponent,
    RyodanReportComponent,
    RyodanReportRowComponent,
    RyodanLabelComponent,
    RyodanMetamasksComponent,
    RyodanMmHeaderComponent,
    RyodanMetamasksFormComponent,
    RyodanMmUserRowComponent,
    RyodanMmUserComponent,
    RyodanWalletRowComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    ScrollingModule,
    HttpClientModule,
    ToolsModule,
    NgxSpinnerModule,
  ],
  providers: [
    RyodanHttpService,
    RyodanDataService,
    RyodanHeaderService,
    RyodanMmHeaderService,
    HttpService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Interceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RyodanCustomizationInterceptor,
      multi: true,
    },
  ],
})
export class RyodanCustomizationModule {}
