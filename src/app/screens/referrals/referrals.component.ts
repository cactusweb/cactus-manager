import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { take, finalize, map } from 'rxjs/operators';
import { Requests } from 'src/app/const';
import { License } from 'src/app/interfaces/license';
import { AuthService } from 'src/app/services/auth/auth.service';
import { HttpService } from 'src/app/services/http/http.service';
import { ToolsService } from 'src/app/services/tools/tools.service';

@Component({
  selector: 'app-referrals',
  templateUrl: './referrals.component.html',
  styleUrls: ['./referrals.component.scss']
})
export class ReferralsComponent implements OnInit {
  licenses: License[] = [];
  infoLicense: License;

  load_error = false;

  currentDate = new Date().getTime();


  sortParam: string = '';

  searchParam: string = '';
  searchKeys = [
    'key', 
    { par1: 'user', par2: 'full_name' },
    { par1: 'user', par2: 'discord_id' },
    { par1: 'payment', par2: 'email' },
    { par1: 'payment', par2: 'last4' },
   'expires_in', 
   'create_at'
  ]


  constructor(
    private http: HttpService,
    private aio: ToolsService,
    private spinner: NgxSpinnerService,
    private auth: AuthService,
  ) { 
  }

  async ngOnInit(){
    this.getLicenses();
  }

  onClose(){
    this.infoLicense = undefined;
  }

  async getLicenses(){
    this.spinner.show()
    this.load_error = false;

    this.http.request( Requests.getAllLicense )
      .pipe( 
        take(1), 
        finalize( () => this.spinner.hide() ),
        map( ( licenses: License[] ) => 
          licenses.map( license => { 
            return {
              ...license,
              expires_in: Number(license.expires_in) * 1000,
              created_at: Number(license.created_at) * 1000,
              payment: {
                ...license.payment,
              }
            }
        }))
      )
      .subscribe(
        res => this.licenses = res,
        err => this.load_error = true
      )
  }

  deleteLicense(id: string){
    this.spinner.show()
    this.http.request( Requests.deleteLicense, null, id )
      .pipe( take(1), finalize( () => this.spinner.hide() ) )
      .subscribe( 
        res => this.licenses = this.licenses.filter( ell => ell.id !== id ),
        err => {},
        () => this.licenses = this.licenses.filter( ell => ell.id !== id )
      )
  }

  async onEditLicense( license: License ){
    for ( let i = 0; i < this.licenses.length; i++ )
      if ( this.licenses[i].id == license.id ){
        this.licenses[i] = license 
        break;
      }
    
    this.licenses = this.licenses.map( license => ({
      ... license,
    }))
    
  }





  resetPoints(license?: License){
    this.http.request( Requests.resetRefPoints, null, license?.id || '' )
      .pipe(take(1))
      .subscribe(
        res => {},
        err => {},
        () => {
          this.licenses = this.licenses.map( l => {
            return l
          }) 
        }
      )
  }




  onSortChange(){
    setTimeout(() => {
      this.licenses = this.licenses.map( license => ({
        ... license,
      }))
    }, 200);
  }

  
  trackByFn(index, item){
    return item.key;
  }


  copyData( key ){
      this.aio.copy(key);
  }
  

  setFirstExpired( arr ){
    
    let expires = arr.filter( license => license.expires_in*1000 >= this.currentDate );
    let norm = arr.filter( license => license.expires_in*1000 < this.currentDate );
    return expires.concat( norm );
    // if ( this.currentDate > this )
  }

}
