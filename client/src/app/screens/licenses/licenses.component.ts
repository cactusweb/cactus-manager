import { AfterViewInit, Component, DoCheck, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/services/auth/auth.service';
import { HttpService } from 'src/app/services/http/http.service';
import { ToolsService } from 'src/app/services/tools/tools.service';
import { SeoService } from 'src/app/services/seo/seo.service';
import { License } from 'src/app/interfaces/license';

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
    private activatedRoute: ActivatedRoute,
    private seo: SeoService,
    private http: HttpService,
    private aio: ToolsService,
    private spinner: NgxSpinnerService,
    private auth: AuthService,
  ) { 
    let data: any = this.activatedRoute.data.pipe();
    data = data._value;
    this.seo.changeTitle(data.title);
  }

  async ngOnInit(){
    await this.getLicenses();
  }

  onClose(){
    this.newKey = false;
    this.editingLicense = undefined;
    this.infoLicense = undefined;
  }

  async getLicenses(){
    this.spinner.show()
    await this.http.getLicenses()
      .then( (w: any = [{}]) => {
        this.licenses = this.setFirstExpired(w);
        this.licenses = this.licenses.map( license => ({
          ... license,
          expires_in: license.expires_in*1000,
          created_at: license.created_at*1000
        }))
        this.spinner.hide()  
      })
      .catch( e => {
        if (e.status == 401){
          this.spinner.hide();
          this.auth.logout();
        }
        else{
          this.spinner.show()
        }
      })
  }

  async deleteLicense(id: string){
    this.spinner.show()
    await this.http.deleteLicense(id)
      .then( async() => { 
          this.licenses = this.licenses.filter( ell => ell.id !== id )
          
          this.spinner.hide()
       })
      .catch( e => { 
        if (e.status == 401){
          this.spinner.hide()
          this.auth.logout();
        }
      })
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
  

  async renewalNow( license ){
    let expires_in = new Date(license.expires_in); 
    expires_in.setMonth( expires_in.getMonth()+1 );
    license.expires_in = expires_in;

    license = {
      expires_in: license.expires_in,
      id: license.id
    }
    this.spinner.show();
    await this.http.putLicense( license )
      .then()
      .catch()
    this.spinner.hide();
  }


  daysToMs( countOfDays: number ){
    return countOfDays * ( 1000 * 60 * 60 * 24 );
  }



  setFirstExpired( arr ){
    
    let expires = arr.filter( license => license.expires_in >= this.currentDate );
    let norm = arr.filter( license => license.expires_in < this.currentDate );
    return expires.concat( norm );
    // if ( this.currentDate > this )
  }

}
