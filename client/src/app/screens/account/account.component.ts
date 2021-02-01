import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/services/auth/auth.service';
import { HttpService } from 'src/app/services/http/http.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  firstLoad: boolean = true;
  pageName: string = 'Users'

  constructor(
    private http: HttpService,
    private auth: AuthService,
    private spinner: NgxSpinnerService
  ) { 
    
  }

  async ngOnInit() {
    this.spinner.show();
    if (localStorage.getItem('accessToken'))
      await this.http.getSelf()
        .then( (w: any = {}) =>{
          localStorage.setItem('name', w.name);
          localStorage.setItem('email', w.email);
          localStorage.setItem( 'ownerId', w._id );
        })
        .catch( e => {
          if ( e.status == 401 ){
            this.auth.logout();

          }
        })
    this.spinner.hide();
    this.firstLoad = false;
     
  }

}
