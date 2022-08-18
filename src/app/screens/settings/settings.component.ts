import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize, take, tap } from 'rxjs/operators';
import { Requests } from 'src/app/const';
import { Owner } from 'src/app/interfaces/owner';
import { AuthService } from 'src/app/services/auth/auth.service';
import { HttpService } from 'src/app/services/http/http.service';
import { SeoService } from 'src/app/services/seo/seo.service';
import { SingletonService } from 'src/app/services/singleton/singleton.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  me: Owner;
  settings;

  load_error: any = false;

  showChangePasswordForm: boolean = false;

  constructor(
    private spinner: NgxSpinnerService,
    private http: HttpService,
    private auth: AuthService,
    private singleton: SingletonService
  ) { 
  }

  ngOnInit(): void {
    this.getSettings();
  }

  

  putSettings(  ){
    this.spinner.show();
    this.load_error = false;
    this.me.settings = this.settings;

    this.http.request( Requests.editSelf, this.me )
      .pipe( 
        take(1), 
        finalize( () => this.spinner.hide() ),
      )
      .subscribe(
        res => { this.singleton.owner = this.me },
        err => this.load_error = 'put'
      )
  }


  

  getSettings(){
    this.spinner.show();
    this.load_error = false;

    this.http.request( Requests.getSelf )
      .pipe( 
        take(1), 
        finalize( () => this.spinner.hide() ),
        tap( d => this.singleton.owner = d ) 
      )
      .subscribe(
        res => { this.me = res; this.settings = res.settings },
        err => this.load_error = 'get'
      )
  }

  onRefresh(){
    this.load_error == 'get' ? this.getSettings() : this.putSettings();
  }


  onChangeTags(e){
    console.log(e)
  }


}
