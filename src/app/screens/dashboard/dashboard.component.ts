import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize, take } from 'rxjs/operators';
import { Requests } from 'src/app/const';
import { HttpService } from 'src/app/services/http/http.service';
import { Stats } from 'src/app/interfaces/stats';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  stats!: Stats;
  load_error: boolean = false;

  constructor(
    private http: HttpService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.getStats();
  }

  ngOnDestroy(){
    this.spinner.hide();
  }



  getStats(){
    this.load_error = false;
    this.spinner.show();
    this.http.request( Requests.getStats )
      .pipe( take(1), finalize( () => this.spinner.hide() ) )
      .subscribe(
        res => this.stats = res,
        err => this.load_error = true
      )
  }

}
