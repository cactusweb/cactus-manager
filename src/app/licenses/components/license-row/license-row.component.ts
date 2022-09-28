import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize, take } from 'rxjs';
import { spinnerName } from 'src/app/account/consts';
import { ToolsService } from 'src/app/tools/services/tools.service';
import { License } from '../../interfaces/license';
import { LicensesService } from '../../services/licenses.service';

@Component({
  selector: 'app-license-row',
  templateUrl: './license-row.component.html',
  styleUrls: ['./license-row.component.scss']
})
export class LicenseRowComponent implements OnInit {
  @Input() license!: License;

  @Output() onView = new EventEmitter<string>();
  @Output() onEdit = new EventEmitter<string>();
  @Output() onRenew = new EventEmitter<{ id: string, expiresDate: number }>();
  @Output() onDelete = new EventEmitter<string>()

  constructor(
    public tools: ToolsService,
    private spinner: NgxSpinnerService,
    private http: LicensesService
  ) { }

  ngOnInit(): void {
  }


  renew(){
    this.spinner.show(spinnerName)

    this.http.renewLicense(this.license.id)
      .pipe(
        take(1),
        finalize(() => this.spinner.hide(spinnerName))
      )
      .subscribe({
        next: (v: License) => {
          this.license = v;
          this.onRenew.emit({id: this.license.id, expiresDate: this.license.expires_in});
        },
        error: e => {},
      })
  }

  delete(){
    this.spinner.show(spinnerName)

    this.http.deleteLicense(this.license.id)
      .pipe(
        take(1),
        finalize(() => this.spinner.hide(spinnerName))
      )
      .subscribe({
        next: () => {},
        error: () => {},
        complete: () => this.onDelete.emit(this.license.id)
      })
  }



  getLastFour(): string{
    return this.license.key.substring(15,19)
  }

  paymentCardActive(): boolean{
    return !!this.license.payment.last4
  }

  renewBeforeDays(daysBefore: number){
    return Date.now() + (daysBefore * ( 1000 * 60 * 60 * 24 )) > this.license.expires_in
  }

}
