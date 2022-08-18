import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/services/auth/auth.service';
import { HttpService } from 'src/app/services/http/http.service';
import { Owner } from 'src/app/interfaces/owner'
import { Requests } from 'src/app/const';
import { finalize, take, tap } from 'rxjs/operators';
import { SingletonService } from 'src/app/services/singleton/singleton.service';

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
    private spinner: NgxSpinnerService,
    private singleton: SingletonService
  ) { 
    
  }

  ngOnInit() {
    this.getSetAccountData();
    this.firstLoad = false;
  }

  getSetAccountData(){
    if ( !localStorage.getItem( 'accessToken' ) )
      return;

    this.spinner.show();
    this.http.request( Requests.getSelf )
      .pipe( 
        take(1), finalize( () => this.spinner.hide() ), 
        tap(d => this.singleton.owner = d)
      )
      .subscribe( res => this.setLocalStorage( res ), err => {})
  }

  setLocalStorage( res: any ){
    localStorage.setItem( 'name', res.name);
    localStorage.setItem( 'email', res.email);
    localStorage.setItem( 'id', res.id );
    localStorage.setItem( 'avatar', res.uploads.avatar );
    localStorage.setItem( 'serverRoles', JSON.stringify(res.settings.discord.roles) )
  }

}
