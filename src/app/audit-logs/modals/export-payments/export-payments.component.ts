import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, finalize } from 'rxjs';
import { req } from 'src/app/tools/interfaces/req-map';
import { HttpService } from 'src/app/tools/services/http.service';
import { environment } from 'src/environments/environment';

const EXPORT_LOGS_REQ: req = {
  url: '/log/export',
  method: 'GET',
};

@Component({
  selector: 'csd-export-payment',
  templateUrl: './export-payments.component.html',
  styles: [
    `
      mat-dialog-actions {
        @apply tw-grid tw-grid-cols-2;
      }

      mat-dialog-actions {
        @apply tw-px-6 tw-pb-5;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExportPaymentsComponent {
  readonly form = new FormGroup({
    actions: new FormControl(['renew', 'auto-renew', 'purchase']),
    date_from: new FormControl(null, Validators.required),
  });
  readonly loading$ = new BehaviorSubject(false);

  constructor(private http: HttpClient) {}

  onExport() {
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      return;
    }

    this.loading$.next(true);
    const params = new URLSearchParams(
      this.form.value as Record<string, string>
    );

    this.http
      .get(environment.apiUrl + '/log/export?' + params.toString(), {
        responseType: 'blob',
      })
      .pipe(finalize(() => this.loading$.next(false)))
      .subscribe({
        next: (res) => {
          const dataType = res.type;
          let binaryData = [];
          binaryData.push(res);
          let downloadLink = document.createElement('a');
          downloadLink.href = window.URL.createObjectURL(
            new Blob(binaryData, { type: dataType })
          );
          document.body.appendChild(downloadLink);
          downloadLink.click();
        },
        error: () => {},
      });
  }
}
