import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';
import { spinnerName } from 'src/app/account/consts';
import { RyodanShortReport } from 'src/app/ryodan-customization/common/interfaces/ryodan-customization.interfaces';
import { RyodanHttpService } from 'src/app/ryodan-customization/common/services/ryodan-http.service';

@Component({
  selector: 'ryodan-report-row',
  templateUrl: './report-row.component.html',
  styleUrls: ['./report-row.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RyodanReportRowComponent {
  @Input()
  report!: RyodanShortReport;

  @Output()
  view = new EventEmitter<void>();

  constructor(
    private http: RyodanHttpService,
    private spinner: NgxSpinnerService
  ) {}

  delete(event: Event) {
    event.stopPropagation();

    this.spinner.show(spinnerName);

    this.http
      .deleteReport(this.report.id)
      .pipe(finalize(() => this.spinner.hide(spinnerName)))
      .subscribe({
        error: () => {},
      });
  }
}
