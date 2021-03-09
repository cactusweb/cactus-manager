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


  filterParams = [
    {key: 'status', status: false, str: 'renewal'},
    {key: 'status', status: false, str: 'lifetime'}
  ]
  filterChange: boolean = false;

  searchParam: string = '';
  searchKeys = ['key', 'user', 'outputExpiresIn', 'createdAt']


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
        this.licenses = w;
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

  async deleteLicense(key: string){
    this.spinner.show()
    await this.http.deleteLicense(key)
      .then( async() => { 
          this.licenses = this.licenses.filter( ell => ell.key !== key )
          
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
      if ( this.licenses[i]._id == license._id ){
        this.licenses[i] = license 
        break;
      }
    
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

  
  trackByFn(index, item){
    return item.key;
  }


  copyData( key ){
      this.aio.copy(key);
  }
  

  async renewalNow( license ){
    let expiresIn = new Date(license.expiresIn); 
    expiresIn.setMonth( expiresIn.getMonth()+1 );
    license.expiresIn = expiresIn;

    license = {
      expiresIn: license.expiresIn,
      _id: license._id
    }
    this.spinner.show();
    await this.http.putLicense( license )
      .then()
      .catch()
    this.spinner.hide();
  }
}
