import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpService } from 'src/app/services/http/http.service';

@Component({
  selector: 'app-audit-log',
  templateUrl: './audit-log.component.html',
  styleUrls: ['./audit-log.component.scss']
})
export class AuditLogComponent implements OnInit {
  searchParam = '';
  load_error = false;

  
  filterParams = [
    {key: 'action', status: false, str: 'bind'},
    {key: 'action', status: false, str: 'unbind'},
    {key: 'action', status: false, str: 'renew'},
    {key: 'action', status: false, str: 'deleted'},
    {key: 'action', status: false, str: 'expired'},
    {key: 'action', status: false, str: 'purchase'},
    {key: 'action', status: false, str: 'generated'}
  ]

  filterCount: number = 0;

  constructor(
    private http: HttpService,
    private spinner: NgxSpinnerService,
  ) { }

  async ngOnInit() {
    await this.getLogs();
  }

  async getLogs(){
    this.load_error = false;
    this.spinner.show();
    await this.http.getLogs()
      .then( w => {}) 
      .catch( e => {
        this.load_error = true;
      })
    this.spinner.hide();
  }

}
