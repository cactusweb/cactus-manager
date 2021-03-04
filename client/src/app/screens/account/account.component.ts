import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/services/auth/auth.service';
import { HttpService } from 'src/app/services/http/http.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  firstLoad: boolean = true;
  pageName: string = 'Users';
  dataShow: boolean = false;

  constructor(
    private http: HttpService,
    private auth: AuthService,
    private spinner: NgxSpinnerService
  ) { 
    
  }

  async ngOnInit() {
    await this.getSetAccountData();
    this.firstLoad = false;
  }

  async getSetAccountData(){
    this.spinner.show();
    if (localStorage.getItem('accessToken'))
      await this.http.getSelf()
        .then( (w: any = {}) =>{
          localStorage.setItem('name', w.name);
          localStorage.setItem('email', w.email);
          localStorage.setItem( 'ownerId', w.id );
          localStorage.setItem( 'ownerAvatar', w.avatar )
        })
        .catch( e => {
          if ( e.status == 401 ){
            this.auth.logout();

          }
        })
    this.spinner.hide();
  }

}
