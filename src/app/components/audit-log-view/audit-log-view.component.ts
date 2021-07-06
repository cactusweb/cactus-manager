import { Component, Input, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize, map, take } from 'rxjs/operators';
import { Requests } from 'src/app/const';
import { HttpService } from 'src/app/services/http/http.service';

@Component({
  selector: 'app-audit-log-view',
  templateUrl: './audit-log-view.component.html',
  styleUrls: ['./audit-log-view.component.scss']
})
export class AuditLogViewComponent implements OnInit {
  @Input() searchParam: string = '';

  searchKeys = [
    'key', 
    { par1: 'who', par2: 'name' },
  ]

  @Input() filterParams;
  @Input() filterChange;

  logs;

  constructor(
    private http: HttpService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.getLogs();
  }

  getLogs(){
    this.spinner.show();
    this.http.request( Requests.getAllLog )
      .pipe( take(1), finalize( () => this.spinner.hide() ), 
             map( logs => {
               logs.reverse() 
               return logs.map( log => {
                 return {
                  ...log,
                  who: {
                    ...log.who,
                    name: log.who?.name == localStorage.getItem('name') ? 'Admin' : log.who?.name
                  },
                  when: log.when * 1000
                 } 
               })
             }) 
        )
      .subscribe( res => this.logs = res, err => {})
  }

}
