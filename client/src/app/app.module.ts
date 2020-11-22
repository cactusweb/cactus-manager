import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';


import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from "ngx-spinner";
import { NgxMaskModule } from "ngx-mask";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AuthLoginComponent } from './components/auth-login/auth-login.component';
import { AuthSignupComponent } from './components/auth-signup/auth-signup.component';

import { LicensesComponent } from './components/account-components/licenses/licenses.component';
import { LicenseGenComponent } from './components/account-components/license-gen/license-gen.component';
import { ApiDocComponent } from './components/account-components/api-doc/api-doc.component';
import { SideBarComponent } from './components/account-components/side-bar/side-bar.component';
import { PageNameComponent } from './components/account-components/page-name/page-name.component';
import { AccountComponent } from './components/account/account.component';


import { FilterPipe } from './pipes/filter/filter.pipe';
import { SearchPipe } from './pipes/search/search.pipe';

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
    AuthLoginComponent,
    AuthSignupComponent,
    AccountComponent,
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
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
