import { Component, Input, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
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

  async getLogs(){
    this.spinner.show();
    await this.http.getLogs()
      .then( (w: any) => {
        w = w.concat(w)
        w = w.concat(w)
        this.logs = w.reverse();
        this.logs = this.logs.map( log => ({
          ...log,
          who: {
            ...log.who,
            name: log.who?.name == localStorage.getItem('name') ? 'Admin' : log.who?.name
          },
          when: log.when * 1000
        }))
      })
      .catch( e => {})

    this.spinner.hide();
  }

}
