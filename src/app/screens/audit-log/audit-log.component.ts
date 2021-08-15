import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize, map, take } from 'rxjs/operators';
import { Requests } from 'src/app/const';
import { HttpService } from 'src/app/services/http/http.service';

@Component({
  selector: 'app-audit-log',
  templateUrl: './audit-log.component.html',
  styleUrls: ['./audit-log.component.scss']
})
export class AuditLogComponent implements OnInit {
  searchParam = '';
  load_error = false;
  logs: any;
  
  filterParams = [
    {key: 'action', status: false, str: 'bind'},
    {key: 'action', status: false, str: 'unbind'},
    {key: 'action', status: false, str: 'renew'},
    {key: 'action', status: false, str: 'deleted'},
    {key: 'action', status: false, str: 'expired'},
    {key: 'action', status: false, str: 'purchase'},
    {key: 'action', status: false, str: 'generated'},
    {key: 'action', status: false, str: 'auto-renew'},
    {key: 'action', status: false, str: 'renew-failed'},
    {key: 'action', status: false, str: 'channel-created' },
    {key: 'action', status: false, str: 'card-binding'},
  ]

  filterCount: number = 0;

  constructor(
    private http: HttpService,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit() {
    this.getLogs();
  }
  
  getLogs(){
    this.spinner.show();
    this.load_error = false;
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
      .subscribe( res => this.logs = res, err => this.load_error = true)
  }


}
