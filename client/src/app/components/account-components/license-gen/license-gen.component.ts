import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { HttpService } from 'src/app/services/http/http.service';
import { ToolsService } from 'src/app/services/tools/tools.service';

@Component({
  selector: 'app-license-gen',
  templateUrl: './license-gen.component.html',
  styleUrls: ['./license-gen.component.css']
})
export class LicenseGenComponent implements OnInit {
  @Output() onClose = new EventEmitter<boolean>();
  @Output() onAdd = new EventEmitter<boolean>();
  
  infinityActivating: boolean = false;
  key: string = '';
  formDataKey: FormGroup; 
  status = new FormControl({ value: 'lifetime', disabled: false });
  errorMessage: string = '';

  constructor(
    private aio: ToolsService,
    private http: HttpService,
    private auth: AuthService,
  ) { }

  ngOnInit(): void {
    this.formDataKey = new FormGroup({
      status: this.status,
      user: new FormControl({value: '', disabled: false}, [Validators.required]),
      quantity: new FormControl({value: '', disabled: false}, [ Validators.required ]),
      expiresIn: new FormControl({value: '', disabled: false}),
      key: new FormControl({ value: '', disabled: false })
    })
  }

  copy(id){
    this.aio.copy(id);
  }

  close(){
    this.onClose.emit(false);
  }

  async newKey(){
    this.formDataKey.value.expiresIn = this.status.value == 'lifetime' ? new Date('2222-02-22') : this.formDataKey.value.expiresIn;  
    this.formDataKey.value.key = this.aio.generateKey();

    this.formDataKey.value.quantity = this.infinityActivating ? 0 : this.formDataKey.value.quantity;

    if (this.formDataKey.valid){
      this.errorMessage = '';
      await this.http.postNewLicense(this.formDataKey.value)
        .then( (w: any) => {
          this.key = this.formDataKey.value.key;
          this.onAdd.emit();
        })
        .catch( e => {
          if (e.status == 401)
            this.auth.logout()
          this.errorMessage = e.error.message;
        })
    }
    else this.errorMessage = 'Заполните все поля'

  }

  onInfinity(){
      this.infinityActivating ? this.formDataKey.controls.quantity.disable() : this.formDataKey.controls.quantity.enable()
  }

}
