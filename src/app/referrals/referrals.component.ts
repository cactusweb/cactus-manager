import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize, take } from 'rxjs';
import { spinnerName } from '../account/consts';
import { nicknameSort, refScoreSort, searchLicenseKeys } from '../licenses/const';
import { License } from '../licenses/interfaces/license';
import { LicensesService } from '../licenses/services/licenses.service';


interface PipeData{
  search: string,
  nickname: 'ascend'|'discend'|null,
  refScore: 'ascend'|'discend'|null,
}


@Component({
  selector: 'app-referrals',
  templateUrl: './referrals.component.html',
  styleUrls: ['./referrals.component.scss']
})
export class ReferralsComponent implements OnInit {
  licenses: License[] = []
  popupLicenseId: string | null = null;

  pipeParams = {
    search: searchLicenseKeys,
    nickname: nicknameSort,
    refScore: refScoreSort
  }

  pipeData: PipeData = {
    search: '',
    nickname: null,
    refScore: null
  }

  constructor(
    private lic: LicensesService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.getLicenses();
  }

  getLicenses(){
    // this.spinner.show(spinnerName)

    this.lic.getLicenses()
      .pipe(
        take(1),
        finalize(() => this.spinner.hide(spinnerName))
      )
      .subscribe({
        next: (l) => this.licenses = l,
        error: () => {}
      })
  }


  resetPoints(licId?: string){
    this.licenses = this.licenses.map(l => { 
      if ( licId && l.id !== licId || !l.referral ) return l;
      return { ...l, referral: { ...l.referral, score: 0 } }
    })
  }

  
  getLicenseById(id: string): License | null{
    return this.licenses.find(l => l.id == id) || null
  }

  justMap(){
    this.licenses = this.licenses.map(l => l)
  }
  
  trackByFn(index: any, item: License){
    return item.key;
  }

}
