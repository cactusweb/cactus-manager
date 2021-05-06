import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
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
  
  async onAddFile(event){
    let file = this.aio.getFormData( event );
    console.log( event )
    if ( !file ) return;

    file.forEach( console.log )

    this.spinner.show();
    
    await this.http.postFile( file, 'avatar' )
      .then( async ( w: any ) => {
        this.avatar = w.avatar;
        // this.newValue.emit( this.avatar );
        this.spinner.hide();
      })
      .catch( e => {
        if ( e.status == 401 ){
          this.auth.logout();
          this.spinner.hide();
        }
      })
  }

}
