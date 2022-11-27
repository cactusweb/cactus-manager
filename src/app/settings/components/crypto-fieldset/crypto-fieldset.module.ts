import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CryptoFieldsetComponent } from './crypto-fieldset.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaymentMethodComponent } from './components/payment-method/payment-method.component';
import { ToolsModule } from 'src/app/tools/tools.module';
import { AddressFormComponent } from './components/address-form/address-form.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { PaymentMethodsService } from './services/payment-methods.service';



@NgModule({
  declarations: [
    CryptoFieldsetComponent,
    PaymentMethodComponent,
    AddressFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ToolsModule,
    NgxSpinnerModule
  ],
  exports: [
    CryptoFieldsetComponent
  ],
  providers: [PaymentMethodsService]
})
export class CryptoFieldsetModule { }
