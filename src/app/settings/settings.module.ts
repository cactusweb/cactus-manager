import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './settings.component';
import { RouterModule, Routes } from '@angular/router';
import { PasswordFormComponent } from './components/password-form/password-form.component';
import { ProjectFieldsetComponent } from './components/project-fieldset/project-fieldset.component';
import { PaymentFieldsetComponent } from './components/payment-fieldset/payment-fieldset.component';
import { ReferralFieldsetComponent } from './components/referral-fieldset/referral-fieldset.component';
import { PersonalizationFieldsetComponent } from './components/personalization-fieldset/personalization-fieldset.component';
import { OtherFieldsetComponent } from './components/other-fieldset/other-fieldset.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToolsModule } from '../tools/tools.module';
import { AvatarInpComponent } from './components/avatar-inp/avatar-inp.component';
import { TinkoffFieldsetComponent } from './components/tinkoff-fieldset/tinkoff-fieldset.component';
import { AmeriaFieldsetComponent } from './components/ameria-fieldset/ameria-fieldset.component';
import { PendingChangesGuard } from './guards/pending-changes.guard';
import { PaymentDetailsFieldsetComponent } from './components/payment-details-fieldset/payment-details-fieldset.component';
import { PaymentDetailComponent } from './components/payment-detail/payment-detail.component';
import { OnBeforeUnloadComponent } from './components/on-before-unload/on-before-unload.component';
import { CryptoFieldsetModule } from './components/crypto-fieldset/crypto-fieldset.module';
import { PaymentCallsFieldsetComponent } from './components/payment-calls-fieldset/payment-calls-fieldset.component';
import { ActivationsFieldsetComponent } from './components/activations-fieldset/activations-fieldset.component';
import { StripeFieldsetComponent } from './components/stripe-fieldset/stripe-fieldset.component';

const routes: Routes = [
  {
    path: '',
    component: SettingsComponent,
    canDeactivate: [PendingChangesGuard],
    data: {
      pageName: 'Settings',
      title: 'Settings - CactusManager',
      descript:
        'Settings - Cactus Manager. Manage your account and dashboard data.',
    },
  },
];

@NgModule({
  declarations: [
    SettingsComponent,
    PasswordFormComponent,
    ProjectFieldsetComponent,
    PaymentFieldsetComponent,
    ReferralFieldsetComponent,
    PersonalizationFieldsetComponent,
    OtherFieldsetComponent,
    AvatarInpComponent,
    TinkoffFieldsetComponent,
    AmeriaFieldsetComponent,
    PaymentDetailsFieldsetComponent,
    PaymentDetailComponent,
    OnBeforeUnloadComponent,
    PaymentCallsFieldsetComponent,
    ActivationsFieldsetComponent,
    StripeFieldsetComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    ToolsModule,
    CryptoFieldsetModule,
  ],
})
export class SettingsModule {}
