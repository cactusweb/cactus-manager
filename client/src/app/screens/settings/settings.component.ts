import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/services/auth/auth.service';
import { HttpService } from 'src/app/services/http/http.service';
import { SeoService } from 'src/app/services/seo/seo.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  settings;

  constructor(
    private activatedRoute: ActivatedRoute,
    private seo: SeoService,
    private spinner: NgxSpinnerService,
    private http: HttpService,
    private auth: AuthService
  ) { 
    let data: any = this.activatedRoute.data.pipe();
    data = data._value;
    this.seo.changeTitle(data.title);
  }

  ngOnInit(): void {
    this.getSelf();
  }

  

  async putSelfData(  ){
    this.spinner.show();
    // if ( this.selfData.links.name )
    await this.http.putSelf( this.settings )
      .then( () => this.spinner.hide() )
      .catch( console.log )
  }


  

  async getSelf(){
    this.spinner.show();
    await this.http.getSelf()
      .then( w => {
        this.settings = w;
      })
      .catch( e => {
        if (e.status == 401)
          this.auth.logout();
      })
    this.spinner.hide();
  }

}
