import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/services/auth/auth.service';
import { HttpService } from 'src/app/services/http/http.service';
import { Plan } from 'src/app/interfaces/plan';
import { Requests } from 'src/app/const';
import { finalize, take } from 'rxjs/operators';

@Component({
  selector: 'app-plans-view',
  templateUrl: './plans-view.component.html',
  styleUrls: ['./plans-view.component.scss']
})
export class PlansViewComponent implements OnInit, OnChanges {
  plans;
  isPlanGen: boolean = false;
  viewingPlan;

  
  @Input() loadNow = false;
  @Output() onErrorLoad = new EventEmitter();
  @Output() onSuccessLoad = new EventEmitter();

  @Output() onChangeItems = new EventEmitter<any>();

  constructor(
    private http: HttpService,
    private auth: AuthService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(){
    this.getPlans()
  }

  ngOnChanges(){
    if ( this.loadNow ) this.getPlans();
  }

  getPlans(){
    this.loadNow = false;
    this.spinner.show();
    this.http.request( Requests.getAllPlan )
      .pipe( take(1), finalize( () => this.spinner.hide() ) )
      .subscribe(
        res => { this.plans = res; this.onChangeItems.emit( this.plans ); this.onSuccessLoad.emit() },
        err => { this.onErrorLoad.emit() }
      )
  }

  deletePlan( id: string ){

    this.spinner.show();
    this.http.request( Requests.deletePlan, null, id )
      .pipe( take(1), finalize( () => this.spinner.hide() ) )
      .subscribe(
        res => { this.plans = this.plans.filter( ell => ell.id != id ); this.onChangeItems.emit( this.plans ); },
        err => {  },
        () => { this.plans = this.plans.filter( ell => ell.id != id ); this.onChangeItems.emit( this.plans ); }
      )
  }


  
  onNewItem( event ){
    this.plans.push( event )
    this.plans = this.plans.map(plan => ({
      ...plan,
    }))
    this.onChangeItems.emit( this.plans );
  }


}
