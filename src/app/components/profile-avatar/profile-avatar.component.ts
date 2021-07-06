import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize, take } from 'rxjs/operators';
import { Requests } from 'src/app/const';
import { AioService } from 'src/app/services/aio/aio.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { HttpService } from 'src/app/services/http/http.service';

@Component({
  selector: 'app-profile-avatar',
  templateUrl: './profile-avatar.component.html',
  styleUrls: ['./profile-avatar.component.scss']
})
export class ProfileAvatarComponent implements OnInit {
  @Input() avatar: string = '';
  @Output() newValue = new EventEmitter<string>();

  constructor(
    private aio: AioService,
    private spinner: NgxSpinnerService,
    private http: HttpService,
    private auth: AuthService
  ) { }

  ngOnInit(): void {
  }
  
  onAddFile(event){
    let file = this.aio.getFormData( event );
    if ( !file ) return;

    this.spinner.show();
    
    this.http.request( Requests.postFile, file, 'avatar' )
      .pipe( take(1), finalize( () => this.spinner.hide() ) )
      .subscribe(
        res => { this.avatar = res.avatar; this.newValue.emit( this.avatar ) },
        err => {}
      )
  }

}
