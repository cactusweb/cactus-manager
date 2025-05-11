import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuditLogsComponent } from './audit-logs.component';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { ToolsModule } from '../tools/tools.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LogRowComponent } from './components/log-row/log-row.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { TransactionViewComponent } from './components/transaction-view/transaction-view.component';
import { TransactionViewService } from './components/transaction-view/transaction-view.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ExportPaymentsComponent } from './modals/export-payments/export-payments.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';

const routes: Routes = [
  {
    path: '',
    component: AuditLogsComponent,
    data: {
      pageName: 'Audit log',
      title: 'Audit log - CactusManager',
      descript:
        'Audit log - Cactus Manager. View the activity of your users and the past changes in the audit log.',
    },
  },
];

@NgModule({
  declarations: [
    AuditLogsComponent,
    HeaderComponent,
    LogRowComponent,
    TransactionViewComponent,
    ExportPaymentsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ToolsModule,
    FormsModule,
    ReactiveFormsModule,
    ScrollingModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatInputModule,
  ],
  providers: [TransactionViewService],
})
export class AuditLogsModule {}
