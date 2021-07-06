import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/services/auth/auth.service';
import { HttpService } from 'src/app/services/http/http.service';
import { ToolsService } from 'src/app/services/tools/tools.service';
import { Drop } from 'src/app/interfaces/drop';
import { Requests } from 'src/app/const';
import { finalize, take } from 'rxjs/operators';

@Component({
  selector: 'app-drop-tr',
  templateUrl: './drop-tr.component.html',
  styleUrls: ['./drop-tr.component.scss']
})
export class DropTrComponent implements OnInit {
  @Input() drop: Drop;
  @Output() onDeleteDrop = new EventEmitter<string>();

  constructor(
    private spinner: NgxSpinnerService,
    private http: HttpService,
    private aio: ToolsService
  ) { }

  ngOnInit(): void {
  }

  
  deleteDrop( id: string ){
    this.spinner.show();
    this.http.request( Requests.deleteDrop, null, id )
      .pipe( take(1), finalize( () => this.spinner.hide() ) )
      .subscribe( 
        res => this.onDeleteDrop.emit( id ),
        err => {},
        () => this.onDeleteDrop.emit(id)
      )
  }

  stopDrop( id: string ){
    this.spinner.show();
    this.http.request( Requests.stopDrop, null, id )
      .pipe( take(1), finalize( () => this.spinner.hide() ) )
      .subscribe(
        res => this.drop.status = 'stopped',
        err => {},
        () => this.drop.status = 'stopped'
      )
  }

  
  copyData( text ){
    this.aio.copy( text )
  }

}
