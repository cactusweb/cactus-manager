import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/services/auth/auth.service';
import { HttpService } from 'src/app/services/http/http.service';

@Component({
  selector: 'app-drop-tr',
  templateUrl: './drop-tr.component.html',
  styleUrls: ['./drop-tr.component.scss']
})
export class DropTrComponent implements OnInit {
  @Input() drop: any;
  @Output() onDeleteDrop = new EventEmitter<string>();

  constructor(
    private spinner: NgxSpinnerService,
    private http: HttpService,
    private auth: AuthService
  ) { }

  ngOnInit(): void {
  }

  
  async deleteDrop( id: string ){
    this.spinner.show();
    await this.http.deleteDrop( id )
      .then( w => {
        this.onDeleteDrop.emit( id );
        this.spinner.hide();
      })
      .catch( e => {
        if ( e.status == 401 ){
          this.auth.logout();
          this.spinner.hide();
        }
      })
  }

  async stopDrop( id: string ){
    this.spinner.show();
    await this.http.stopDrop( id )
      .then( () => {
        this.drop.status = 'stopped';
        this.spinner.hide();
      })
      .catch(e => {
        if ( e.status == 401 ){
          this.auth.logout();
          this.spinner.hide();
        }
      })
  }

  
  copyData( text ){
    navigator.clipboard.writeText(text)
  }

}
