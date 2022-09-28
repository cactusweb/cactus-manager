import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountComponent } from './account.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { OrgInfoComponent } from './components/org-info/org-info.component';
import { AccountRoutingModule } from './account-routing.module';
import { RouterLoaderComponent } from './components/router-loader/router-loader.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FailedLoadModule } from '../failed-load/failed-load.module';


@NgModule({
  declarations: [
    AccountComponent,
    SidebarComponent,
    NavbarComponent,
    OrgInfoComponent,
    RouterLoaderComponent
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    NgxSpinnerModule,
    FailedLoadModule
  ]
})
export class AccountModule { }
