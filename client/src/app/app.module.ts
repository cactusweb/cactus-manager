import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';


import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from "ngx-spinner";
import { NgxMaskModule } from "ngx-mask";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { AdminAuthComponent } from './auth/admin-auth/admin-auth.component';
import { KeysComponent } from './owner/keys/keys.component';
import { OwnerSideBarComponent } from './owner/owner-side-bar/owner-side-bar.component';
import { OwnerComponent } from './owner/owner/owner.component';
import { PageHeaderComponent } from './page-header/page-header.component';
import { OwnerApiComponent } from './owner/owner-api/owner-api.component';
import { SearchPipe } from './shared/pipes/search/search.pipe';
import { NewKeyComponent } from './owner/new-key/new-key.component';
import { AdminSideBarComponent } from './admin/admin-side-bar/admin-side-bar.component';
import { AdminComponent } from './admin/admin/admin.component';
import { AdminUsersComponent } from './admin/admin-users/admin-users.component';
import { NewRegistrKeyComponent } from './admin/new-registr-key/new-registr-key.component';
import { FilterPipe } from './shared/pipes/filter/filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    SignUpComponent,
    AdminAuthComponent,
    KeysComponent,
    OwnerSideBarComponent,
    OwnerComponent,
    PageHeaderComponent,
    OwnerApiComponent,
    SearchPipe,
    NewKeyComponent,
    AdminSideBarComponent,
    AdminComponent,
    AdminUsersComponent,
    NewRegistrKeyComponent,
    FilterPipe
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
