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

  @Input() license: License;
  
  infinityActivating: boolean = false;
  key: string = '';
  formLicense: FormGroup; 
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private aio: ToolsService,
    private http: HttpService,
    private auth: AuthService,
  ) { }

  ngOnInit() {
    this.generateForm()
    // this.onEscape();
    console.log( this.license )
  }

  onEscape(){
    let listener = document.addEventListener( 'keyup', e => {
      console.log(e)
      document.removeEventListener( 'keyup', () => { } )
      if ( e.key == 'Escape' ) this.onClose.emit();
    })
  }


  copy(id){
    this.aio.copy(id);
  }


  async newLicense(){
    this.formLicense.value.expiresIn = this.formLicense.value.status == 'lifetime' ? new Date('2222-02-22') : this.formLicense.value.expiresIn;  
    
    if ( !this.license )
      this.formLicense.value.key = this.aio.generateKey();

    this.formLicense.value.quantity = this.infinityActivating ? 0 : this.formLicense.value.quantity;

    if ( this.formLicense.valid && !this.license ){
      await this.postLicense();
    }else 
    if ( this.formLicense.valid && this.license ){
      await this.putLicense();
    }
    else this.errorMessage = 'Fill in all fields';

  }

  async postLicense(){
    this.errorMessage = '';
    this.successMessage = '';
    await this.http.postNewLicense(this.formLicense.value)
      .then( (w: any) => {
        this.key = this.formLicense.value.key;
        this.showMessage( 'License added', false )
        this.onAdd.emit(w);
      })
      .catch( e => {
        if (e.status == 401)
          this.auth.logout()
        this.showMessage(e.error.message, true);
      })
  }

  async putLicense(){
    this.errorMessage = '';
    this.successMessage = '';
    
    await this.http.putLicense(this.formLicense.value)
      .then( async(w) => { 
        this.showMessage( 'License edit', false )
        this.onEdit.emit(w);
      })
      .catch( e => {
        if (e.status == 401)
          this.auth.logout()
        this.showMessage(e.error.message, true);
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
      status: new FormControl({value: this.license?.status || 'lifetime', disabled: false}, [Validators.required]),
      user: new FormControl({value: this.license?.user || '', disabled: false}, [Validators.required]),
      quantity: new FormControl({value: this.license?.quantity || '', disabled: false}, [ Validators.required ]),
      expiresIn: new FormControl({value: expiresIn || '', disabled: false}),
      key: new FormControl({ value: this.license?.key || '', disabled: false }),
    })

    if ( this.license ){
      this.formLicense.addControl( '_id', new FormControl({ value: this.license._id, disabled: false }) )
      this.infinityActivating = this.license.quantity === 0 ? true : false;
    }
  }



  showMessage( message: string, error: boolean ){
    if (!error){
      this.successMessage = message;
      setTimeout(() => {
        this.successMessage = '';
      }, 3000);
      return;
    }

    this.errorMessage = message;
    setTimeout(() => {
      this.successMessage = '';
    }, 3000);

  }


}
