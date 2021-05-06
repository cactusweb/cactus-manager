import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/services/auth/auth.service';
import { HttpService } from 'src/app/services/http/http.service';
import { Plan } from 'src/app/interfaces/plan';

@Component({
  selector: 'app-plans-view',
  templateUrl: './plans-view.component.html',
  styleUrls: ['./plans-view.component.scss']
})
export class PlansViewComponent implements OnInit {
  plans;
  isPlanGen: boolean = false;
  viewingPlan;

  @Output() onChangeItems = new EventEmitter<any>();

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
      .then( ( w ) => {
        this.plans = w;
        this.onChangeItems.emit( this.plans );
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
      .then( () => {
        this.plans = this.plans.filter( ell => ell.id != id );
        this.onChangeItems.emit( this.plans );
        this.spinner.hide();
      })
      .catch( e => {
        if ( e.status == 401 ){
          this.spinner.hide();
          this.auth.logout();
        }
      })

  }


  
  onNewItem( event ){
    this.plans.push( event )
    this.plans = this.plans.map(plan => ({
      ...plan,
    }))
    this.onChangeItems.emit( this.plans );
  }


}
