import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Owner } from 'src/app/interfaces/owner';
import { AioService } from 'src/app/services/aio/aio.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { HttpService } from 'src/app/services/http/http.service';
import { SeoService } from 'src/app/services/seo/seo.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
    selfData: Owner;
    load_error: any = false;


  constructor(
    private aio: AioService,
    private http: HttpService,
    private spinner: NgxSpinnerService,
    private auth: AuthService
  ) { 
  }

  async ngOnInit() {
    this.getSelf();
  }




  async putSelfData(  ){
    this.load_error = false;
    this.spinner.show();
    this.selfData.links = null;
    await this.http.putSelf( this.selfData )
      .then( () => {})
      .catch( () => {
        this.load_error = 'put'
      })
      this.spinner.hide()
  }


  

  async getSelf(){
    this.load_error = false;
    this.spinner.show();
    await this.http.getSelf()
      .then( (w: Owner) => {
        this.selfData = w;
      })
      .catch( e => {
        if (e.status == 401)
          this.auth.logout();
        else this.load_error = 'get';
      })
    this.spinner.hide();
  }

  async onAddBG(file){
    file = this.aio.getFormData( file );
    if ( !file ) return;

    file.forEach( console.log )

    this.spinner.show();
    
    await this.http.postFile( file, 'background/background' )
      .then( async ( w: any ) => {
        this.spinner.hide();
      })
      .catch( e => {
        if ( e.status == 401 ){
          this.auth.logout();
          this.spinner.hide();
        }
      })
  }

  onRefresh(){
    this.load_error == 'get' ? this.getSelf() : this.putSelfData();
  }


}
