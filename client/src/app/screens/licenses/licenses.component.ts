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
  formEditLicense: FormGroup;


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
    private tools: ToolsService,
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

  onChangeNewKey(isOpen: boolean){
    this.newKey = isOpen || false;
    this.editingLicense = undefined;
  }

  async getLicenses(){
    this.spinner.show()
    await this.http.getLicenses()
      .then( (w: any = [{}]) => {
        this.makeValidLicensesArr(w);
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
          this.licenses = this.licenses.filter( ell => ell._id !== id )
          this.makeValidLicensesArr(this.licenses);
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
    this.makeValidLicensesArr(this.licenses);
  }


  async editLicense(license){
    this.editingLicense = license;
    this.newKey = true;
  }




  onAddLicense(license){
    this.licenses.push(license); 
    this.makeValidLicensesArr(this.licenses);
  }


  makeValidLicensesArr(arr){
    this.licenses = arr.map(license => ({
      ...license,
      outputCreatedAt: this.tools.outputDate(new Date(license.createdAt)),
      outputExpiresIn: this.tools.outputDate(new Date(license.expiresIn || '')) || '-' ,
      expiresIn: license.expiresIn || ''
    }))
  }

  onFilterChange(){
    this.filterChange = !this.filterChange;
  }

  
  trackByFn(index, item){
    return item._id;
  }


  copyData( text ){
    navigator.clipboard.writeText(text)
    // .then(function() {
    //   console.log('Async: Copying to clipboard was successful!');
    // }, function(err) {
    //   console.error('Async: Could not copy text: ', err);
    // });
  }
}
