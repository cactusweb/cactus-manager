import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize, take, tap } from 'rxjs/operators';
import { Requests } from 'src/app/const';
import { Owner } from 'src/app/interfaces/owner';
import { AioService } from 'src/app/services/aio/aio.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { HttpService } from 'src/app/services/http/http.service';
import { SeoService } from 'src/app/services/seo/seo.service';
import { SingletonService } from 'src/app/services/singleton/singleton.service';

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
    private signleton: SingletonService
  ) { 
  }

  ngOnInit() {
    this.getSelf();
  }




  putSelfData(  ){
    this.load_error = false;
    this.spinner.show();
    this.selfData.links = null;

    this.http.request( Requests.editSelf, this.selfData )
      .pipe( take(1), finalize( () => this.spinner.hide() ) )
      .subscribe(
        res => {},
        err => this.load_error = 'put'
      )
  }


  

  getSelf(){
    this.load_error = false;

    this.spinner.show();

    this.http.request( Requests.getSelf )
      .pipe( 
        take(1), 
        finalize( () => this.spinner.hide() ),
        tap(d => this.signleton.owner = d) 
      )
      .subscribe(
        res => this.selfData = res,
        err => this.load_error = 'get'
      )
  }



  onAddBG(file){
    file = this.aio.getFormData( file );
    if ( !file ) return;

    this.spinner.show();
    
    this.http.request( Requests.postFile, file, 'background/background' )
      .pipe( take(1), finalize( () => this.spinner.hide() ) )
      .subscribe(
        res => {},
        err => {}
      )
  }

  onRefresh(){
    this.load_error == 'get' ? this.getSelf() : this.putSelfData();
  }


}
