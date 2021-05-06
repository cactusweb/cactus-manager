import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpService } from 'src/app/services/http/http.service';

@Component({
  selector: 'app-audit-log-view',
  templateUrl: './audit-log-view.component.html',
  styleUrls: ['./audit-log-view.component.scss']
})
export class AuditLogViewComponent implements OnInit {

  logs = [
    {
      date: new Date(),
      user: {
        avatar: 'https://media.discord.com/ekdef.png',
        fullName: 'gaspromov#1282'
      },
      license: 'AAAA-BBBB-CCCC-DDDD',
      type: 'expired'
    }
  ]

  constructor(
    private http: HttpService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
  }

  async getLogs(){
    this.spinner.show();
    await this.http.getLogs()
      .then( (w: any) => this.logs = w )
      .catch( e => {})

    this.spinner.hide();
  }

}
