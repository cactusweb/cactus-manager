import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { BehaviorSubject, finalize } from 'rxjs';
import { HttpService } from 'src/app/tools/services/http.service';
import { NftVerificationRequests } from '../common/consts/nft-verification.consts';
import { DialogRef } from '@angular/cdk/dialog';
import { AsyncPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'cm-webhook-form',
  templateUrl: './webhook-form.component.html',
  styleUrls: ['./webhook-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    AsyncPipe,
    MatButtonModule,
  ],
  standalone: true,
})
export class WebhookFormComponent {
  readonly form = new FormGroup({
    channelId: new FormControl('', Validators.required),
  });

  readonly loading$ = new BehaviorSubject(false);

  constructor(
    private http: HttpService,
    private dialogRef: DialogRef<WebhookFormComponent>
  ) {}

  sendWh() {
    this.form.markAllAsTouched();

    if (this.form.invalid) {
      return;
    }

    this.loading$.next(true);
    this.http
      .request(NftVerificationRequests.SEND_WH, this.form.value)
      .pipe(finalize(() => this.loading$.next(false)))
      .subscribe({
        next: () => this.dialogRef.close(),
        error: () => {},
      });
  }
}
