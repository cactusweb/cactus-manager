import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/services/auth/auth.service';
import { HttpService } from 'src/app/services/http/http.service';
import { SeoService } from 'src/app/services/seo/seo.service';
import { AioService } from 'src/app/services/aio/aio.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
    selfData: any;


  constructor(
    private activatedRoute: ActivatedRoute,
    private seo: SeoService,
    private aio: AioService,
    private http: HttpService,
    private spinner: NgxSpinnerService,
    private auth: AuthService
  ) { 
    let data: any = this.activatedRoute.data.pipe();
    data = data._value;
    this.seo.changeTitle(data.title);
  }

  async ngOnInit() {
    await this.getSelf();
  }

  async onAddFile(event){
    let file = this.aio.getFormData( event );
    if ( !file ) return;
    this.spinner.show();
    
    await this.http.postFile( file, 'clients' )
      .then( async ( w: any ) => {
        this.selfData.avatar = w.filePath;
        await this.putSelfData();
      })
      .catch( e => {
        if ( e.status == 401 ){
          this.auth.logout();
          this.spinner.hide();
        }
      })
  }



  async putSelfData(  ){
    await this.http.putSelf( this.selfData )
      .then( () => this.spinner.hide() )
      .catch( console.log )
  }

  onClick(e){
    console.log( e )
  }

  

  async getSelf(){
    this.spinner.show();
    await this.http.getSelf()
      .then( w => {
        this.selfData = w;
      })
      .catch( e => {
        if (e.status == 401)
          this.auth.logout();
      })
    this.spinner.hide();
  }


}
