import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { HttpService } from 'src/app/services/http/http.service';
import { ToolsService } from 'src/app/services/tools/tools.service';
import { License } from 'src/app/interfaces/license'

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
  roles: string = '';

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
      console.log(e)
      document.removeEventListener( 'keyup', () => { } )
      if ( e.key == 'Escape' ) this.onClose.emit();
    })
  }


  copy(key){
    this.aio.copy(key);
  }


  async newLicense(){
    this.formLicense.value.expiresIn = this.formLicense.value.status == 'lifetime' ? null : this.formLicense.value.expiresIn;  

    this.formLicense.value.quantity = this.infinityActivating ? 0 : this.formLicense.value.quantity;

    console.log(this.formLicense);
    if ( this.formLicense.valid && !this.license ){
      await this.postLicense();
    }else 
    if ( this.formLicense.valid && this.license ){
      await this.putLicense();
    }
    else{
      this.isError = true;
      this.message = 'Incorrect filling';
    } 

  }

  async postLicense(){
    this.message = '';
    this.setRoles();
    this.setBoolType();
    await this.http.postNewLicense(this.formLicense.value)
      .then( (w: any) => {
        this.key = w.key;
        this.isError = false;
        this.message = 'Successful added';
        this.onAdd.emit(w);
      })
      .catch( e => {
        this.isError = true;
        this.message = e.error.error || e.error.message || e.error;
      })
  }

  async putLicense(){
    this.message = '';
    this.setRoles();
    this.setBoolType();
    
    await this.http.putLicense(this.formLicense.value)
      .then( async(w) => { 
        this.isError = false;
        this.message = 'Successful edit';
        this.onEdit.emit(w);
      })
      .catch( e => {
        this.isError = true;
        this.message = e.error.error || e.error.message || e.error;
      })

  }

  onInfinity(){
      this.infinityActivating ? this.formLicense.controls.quantity.disable() : this.formLicense.controls.quantity.enable()
  }

  generateForm(){
    this.key = this.license?.key || '';
    let expiresIn = '';

    if ( this.license?.expiresIn ){
      let date = new Date(this.license.expiresIn);
      expiresIn = `${date.getFullYear()}-${date.getMonth() < 9 ? `0${date.getMonth()+1}` : date.getMonth()+1}-${date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()}`
    }

    this.formLicense = new FormGroup({
      status: new FormControl({value: this.license?.status || 'renewal', disabled: false}, [Validators.required]),
      price: new FormControl({value: this.license?.price || Number, disabled: false}),
      quantity: new FormControl({value: this.license?.quantity || Number, disabled: false}, [ Validators.required ]),
      expiresIn: new FormControl({value: expiresIn || '', disabled: false}),
      unbindable: new FormControl({value: this.license?.unbindable || false, disabled: false}),
      roles: new FormControl({ value: [], disabled: false } ),
    })

    if ( this.license ){
      this.formLicense.addControl( '_id', new FormControl({ value: this.license._id, disabled: false }) )
      this.infinityActivating = this.license.quantity === 0 ? true : false;
    }
  }

  
  setRoles(){
    this.formLicense.value.roles = this.roles.trim() ? this.roles.split(' ').join('').split(',') : [];
  }


  setBoolType(){
    this.formLicense.value.unbindable = this.formLicense.value.unbindable == 'true';
  }



}
