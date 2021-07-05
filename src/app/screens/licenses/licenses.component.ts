import { AfterViewInit, Component, DoCheck, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/services/auth/auth.service';
import { HttpService } from 'src/app/services/http/http.service';
import { ToolsService } from 'src/app/services/tools/tools.service';
import { SeoService } from 'src/app/services/seo/seo.service';
import { License } from 'src/app/interfaces/license';
import { Requests } from 'src/app/const';
import { finalize, map, take } from 'rxjs/operators';

@Component({
  selector: 'app-licenses',
  templateUrl: './licenses.component.html',
  styleUrls: ['./licenses.component.scss']
})
export class LicensesComponent implements OnInit {
  newKey: boolean = false;
  licenses: any = [];
  editingLicense: License;
  infoLicense: License;

  load_error = false;

  currentDate = new Date().getTime();


  filterParams = [
    {key: 'type', status: false, str: 'renewal'},
    {key: 'type', status: false, str: 'lifetime'}
  ]
  filterChange: boolean = false;

  sortParam: string = '';

  searchParam: string = '';
  searchKeys = [
    'key', 
    { par1: 'user', par2: 'full_name' },
   'expires_in', 'create_at'
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
    this.newKey = false;
    this.editingLicense = undefined;
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
              created_at: Number(license.created_at) * 1000
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


  async editLicense(license){
    this.editingLicense = license;
    this.newKey = true;
  }





  onAddLicense(license){
    this.licenses.push(license); 
    this.licenses = this.licenses.map( license => ({
      ... license,
    }))
  }



  onFilterChange(){
    this.filterChange = !this.filterChange;
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
  

  renewLicense( license ){
    let expires_in = new Date(license.expires_in); 
    expires_in.setMonth( expires_in.getMonth()+1 );
    license.expires_in = expires_in;

    license = {
      expires_in: license.expires_in,
      id: license.id
    }

    this.spinner.show();
    this.http.request( Requests.renewLicense, null, license.id )
      .pipe( take(1), finalize( () => this.spinner.hide() ) )
      .subscribe( res => {}, err => {} )
  }


  daysToMs( countOfDays: number ){
    return countOfDays * ( 1000 * 60 * 60 * 24 );
  }



  setFirstExpired( arr ){
    
    let expires = arr.filter( license => license.expires_in*1000 >= this.currentDate );
    let norm = arr.filter( license => license.expires_in*1000 < this.currentDate );
    return expires.concat( norm );
    // if ( this.currentDate > this )
  }

}
