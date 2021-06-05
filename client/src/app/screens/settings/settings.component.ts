import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Owner } from 'src/app/interfaces/owner';
import { AuthService } from 'src/app/services/auth/auth.service';
import { HttpService } from 'src/app/services/http/http.service';
import { SeoService } from 'src/app/services/seo/seo.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  me: Owner;
  settings;

  load_error: any = false;

  constructor(
    private spinner: NgxSpinnerService,
    private http: HttpService,
    private auth: AuthService
  ) { 
  }

  ngOnInit(): void {
    this.getSettings();
  }

  

  async putSettings(  ){
    this.spinner.show();
    this.load_error = false;
    this.me.settings = this.settings;
    await this.http.putSelf( this.me )
      .then( () => {} )
      .catch( () => this.load_error = 'put' )
      this.spinner.hide()
  }


  

  async getSettings(){
    this.spinner.show();
    this.load_error = false;
    await this.http.getSelf()
      .then( (w: Owner) => {
        this.me = w;
        this.settings = this.me.settings;
      })
      .catch( e => {
        if (e.status == 401)
          this.auth.logout();
        else this.load_error = 'get';
      })
    this.spinner.hide();
  }

  onRefresh(){
    this.load_error == 'get' ? this.getSettings() : this.putSettings();
  }


}
