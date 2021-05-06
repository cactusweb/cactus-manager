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




  async putSelfData(  ){
    this.spinner.show();
    this.selfData.links = null;
    await this.http.putSelf( this.selfData )
      .then( () => this.spinner.hide() )
      .catch( console.log )
  }


  

  async getSelf(){
    this.spinner.show();
    await this.http.getSelf()
      .then( (w: Owner) => {
        this.selfData = w;
      })
      .catch( e => {
        if (e.status == 401)
          this.auth.logout();
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
        // this.avatar = w.filePath;
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
