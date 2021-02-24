import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';


import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from "ngx-spinner";
import { NgxMaskModule } from "ngx-mask";
import { ScrollingModule } from '@angular/cdk/scrolling';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FilterPipe } from './pipes/filter/filter.pipe';
import { SearchPipe } from './pipes/search/search.pipe';

import { LoginComponent } from './screens/login/login.component';
import { SignupComponent } from './screens/signup/signup.component';
import { AccountComponent } from './screens/account/account.component';
import { DropsComponent } from './screens/drops/drops.component';
import { LicensesComponent } from './screens/licenses/licenses.component';
import { ProfileComponent } from './screens/profile/profile.component';

import { LicenseGenComponent } from './components/license-gen/license-gen.component';
import { ApiDocComponent } from './components/api-doc/api-doc.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { PageNameComponent } from './components/page-name/page-name.component';
import { LicenseInfoComponent } from './components/license-info/license-info.component';
import { DropGenComponent } from './components/drop-gen/drop-gen.component';



@NgModule({
  declarations: [
    AppComponent,
    ApiDocComponent,
    SideBarComponent,
    PageNameComponent,
    FilterPipe,
    SearchPipe,
    LicensesComponent,
    LicenseGenComponent,
    AccountComponent,
    LoginComponent,
    SignupComponent,
    DropGenComponent,
    ProfileComponent,
    DropsComponent,
    LicenseInfoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    NgxMaskModule.forRoot(/*options*/),
    ScrollingModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
