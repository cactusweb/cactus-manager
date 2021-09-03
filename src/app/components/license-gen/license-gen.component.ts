import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { HttpService } from 'src/app/services/http/http.service';
import { ToolsService } from 'src/app/services/tools/tools.service';
import { License } from 'src/app/interfaces/license'
import { Requests } from 'src/app/const';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-license-gen',
  templateUrl: './license-gen.component.html',
  styleUrls: ['./license-gen.component.scss']
})
export class LicenseGenComponent implements OnInit {

  @Output() onClose = new EventEmitter<boolean>();
  @Output() onAdd = new EventEmitter<{}>();
  @Output() onEdit = new EventEmitter<{}>();

  @Input() license: any;
  
  infinityActivating: boolean = false;
  roles = [];

  key: string = '';
  formLicense: FormGroup; 
  isError: boolean = true;
  message: string = '';

  constructor(
    private aio: ToolsService,
    private http: HttpService,
    private auth: AuthService,
  ) { }

  ngOnInit() {
    this.generateForm()
  }

  onEscape(){
    let listener = document.addEventListener( 'keyup', e => {
      document.removeEventListener( 'keyup', () => { } )
      if ( e.key == 'Escape' ) this.onClose.emit();
    })
  }


  copy(key){
    this.aio.copy(key);
  }


  newLicense(){
    this.formLicense.value.expires_in = this.formLicense.value.type == 'lifetime' ? null : this.formLicense.value.expires_in;  

    this.formLicense.value.quantity = this.infinityActivating ? 0 : this.formLicense.value.quantity;

    if ( this.formLicense.valid && !this.license ){
      this.postLicense();
    }else 
    if ( this.formLicense.valid && this.license ){
      this.putLicense();
    }
    else{
      this.isError = true;
      this.message = 'Incorrect filling';
    } 

  }

  postLicense(){
    this.message = '';
    this.setDateFormat();
    
    let data = {
      ...this.formLicense.value,
      roles: this.roles || [],
      unbindable: this.formLicense.controls.unbindable.value == 'true' || this.formLicense.controls.unbindable.value === true
    }

    this.http.request( Requests.postLicense, data)
      .pipe( take(1) )
      .subscribe( res =>  handleSuccess(res), err => handleErr(err) )

    let handleSuccess = (res: License) => {
      this.key = res.key;
      this.isError = false;
      this.message = 'Successful added';
      this.onAdd.emit( { ...res, expires_in: Number(res.expires_in) * 1000 } );
    }

    let handleErr = ( err: any ) => {
      this.isError = true;
      this.message = err.error.message || err.error.error || err.error;
    }
  }

  putLicense(){
    this.message = '';
    this.setDateFormat();

    this.formLicense.value.roles = this.roles
    
    let data = {
      ...this.formLicense.value,
      roles: this.roles || [],
      unbindable: this.formLicense.controls.unbindable.value == 'true' || this.formLicense.controls.unbindable.value === true
    }
    // return;
    this.http.request( Requests.editLicense, data, this.formLicense.value.id)
      .pipe( take(1) )
      .subscribe( res => handleSuccess( res ), err => handleErr( err ) )

    let handleSuccess = ( res: License ) => {
        this.isError = false;
        this.message = 'Successful edit';
        this.onEdit.emit( { ...res, expires_in: Number(res.expires_in) * 1000 } );
    }

    let handleErr = ( err: any ) => {
      this.isError = true;
      this.message = err.error.message || err.error.error || err.error;
    }
  }

  onInfinity(){
      this.infinityActivating ? this.formLicense.controls.quantity.disable() : this.formLicense.controls.quantity.enable()
  }

  generateForm(){
    this.key = this.license?.key || '';
    let expires_in = this.license?.expires_in ? new Date(this.license.expires_in) : new Date();

    this.roles = this.license?.discord?.roles?.map( role => role.id ) || [];
    this.formLicense = new FormGroup({
      type: new FormControl({value: this.license?.type || 'renewal', disabled: false}, [Validators.required]),
      price: new FormControl({value: this.license?.payment.price || 0, disabled: false}),
      activations: new FormControl({value: this.license?.activations?.quantity || Number, disabled: false}, [ Validators.required ]),
      expires_in: new FormControl({value: expires_in.toISOString().split('T')[0], disabled: false}),
      unbindable: new FormControl({value: this.license?.unbindable || false, disabled: false}),
      roles: new FormControl({ value: this.roles, disabled: false } ),
      description: new FormControl( this.license?.description || '' )
    })
    
    if ( this.license ){
      this.formLicense.addControl( 'id', new FormControl({ value: this.license.id, disabled: false }) )
      this.infinityActivating = this.license.quantity === 0 ? true : false;
    }
  }

  



  setDateFormat(){
    this.formLicense.value.expires_in = new Date(this.formLicense.value.expires_in)
  }

  onChangeRoles( roles ){
    this.roles = roles;
  }



}
