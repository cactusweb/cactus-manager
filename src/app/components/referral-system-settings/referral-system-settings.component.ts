import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { Requests } from 'src/app/const';
import { HttpService } from 'src/app/services/http/http.service';
import { take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

interface ReferralSystem{
  enable: boolean,
  price: number,
  plan: string
}

@Component({
  selector: 'app-referral-system-settings',
  templateUrl: './referral-system-settings.component.html',
  styleUrls: ['./referral-system-settings.component.scss']
})
export class ReferralSystemSettingsComponent implements OnInit {
  plans = [];
  @Input() refSettings!: ReferralSystem

  @Input() onChangeData = new EventEmitter<ReferralSystem>();

  constructor(
    private http: HttpService
  ) { }

  ngOnInit(): void {

    if ( !environment.production )
      this.refSettings = {
        enable: false,
        price: 0,
        plan: ''
      }
    this.getPlans();
  }

  
  getPlans(){
    this.http.request( Requests.getAllPlan )
      .pipe( take(1) )
      .subscribe(
        res => this.plans = res,
        err => {}
      )
  }
}
