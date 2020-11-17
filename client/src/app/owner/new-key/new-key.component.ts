import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AIOService } from 'src/app/shared/services/AIO/aio.service';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { OwnerService } from 'src/app/shared/services/owner/owner.service';

@Component({
  selector: 'app-new-key',
  templateUrl: './new-key.component.html',
  styleUrls: ['./new-key.component.css']
})
export class NewKeyComponent implements OnInit {
  @Output() onClose = new EventEmitter<boolean>();
  @Output() onAdd = new EventEmitter<boolean>();
  
  infinityActivating: boolean = false;
  key: string = '';
  formDataKey: FormGroup; 
  status = new FormControl({ value: 'lifetime', disabled: false });
  errorMessage: string = '';

  constructor(
    private aio: AIOService,
    private http: OwnerService,
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
            this.auth.ownerLogout()
          console.log(e);
          this.errorMessage = e.error.message;
        })
    }
    else this.errorMessage = 'Заполните все поля'

  }

  onInfinity(){
      this.infinityActivating ? this.formDataKey.controls.quantity.disable() : this.formDataKey.controls.quantity.enable()
  }
}
