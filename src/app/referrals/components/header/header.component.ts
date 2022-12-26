import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize, take } from 'rxjs';
import { spinnerName } from 'src/app/account/consts';
import { LicensesService } from 'src/app/licenses/services/licenses.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeadComponent implements OnInit {
  @Output() onSearch = new EventEmitter<string>()
  @Output() onReset = new EventEmitter();

  searchParam: string = '';
  loading: boolean = false;

  constructor(
    private lic: LicensesService,
  ) { }

  ngOnInit(): void {
  }

  resetPoints(){
    this.loading = true;

    this.lic.changeReferralScore()
      .pipe(
        take(1),
        finalize(() => this.loading = false)
      )
      .subscribe({
        next: () => {},
        error: () => {},
        complete: () => this.onReset.emit()
      })
  }

}
