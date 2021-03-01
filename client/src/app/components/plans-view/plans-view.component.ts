import { Component, OnInit } from '@angular/core';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/services/auth/auth.service';
import { HttpService } from 'src/app/services/http/http.service';

@Component({
  selector: 'app-plans-view',
  templateUrl: './plans-view.component.html',
  styleUrls: ['./plans-view.component.scss']
})
export class PlansViewComponent implements OnInit {
  plans;

  constructor(
    private http: HttpService,
    private auth: AuthService,
    private spinner: NgxSpinnerService
  ) { }

  async ngOnInit(){
    await this.getPlans()
  }

  async getPlans(){
    this.spinner.show();
    await this.http.getPlans()
      .then( w => {
        this.plans = w 
      })
      .catch( e => {
        if ( e.status == 401 ){
          this.spinner.hide();
          this.auth.logout();
        }
      })
  }

  async deletePlan( id: string ){

    this.spinner.show();
    await this.http.deletePlan( id )
      .then( w => {
        this.plans = this.plans.filter( ell => ell.id != id );
        this.spinner.hide();
      })
      .catch( e => {
        if ( e.status == 401 ){
          this.spinner.hide();
          this.auth.logout();
        }
      })

  }

}
