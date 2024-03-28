import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { UntypedFormArray, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Owner } from 'src/app/account/interfaces/owner';
import { SettingsFieldset } from '../../settings.component';

interface DetailValue{
  type: 'card' | 'cryptowallet',
  value: string
}

@Component({
  selector: 'app-payment-details-fieldset',
  templateUrl: './payment-details-fieldset.component.html',
  styleUrls: ['./payment-details-fieldset.component.scss']
})
export class PaymentDetailsFieldsetComponent implements OnInit, SettingsFieldset {
  @Output() onClose = new EventEmitter();

  form!: UntypedFormGroup
  
  lastData!: { cards: string[], cryptowallets: string[] }

  constructor() { }

  
  
  @HostListener('document:keydown.escape', ['$event'])
  onEscape(e: KeyboardEvent){
    this.close(false);
  }

  ngOnInit(): void {
    this.generateForm();
  }

  generateForm(){
    this.form = new UntypedFormGroup({
      details: new UntypedFormArray( [], Validators.required ),
    })
  }

  validate(){
    this.form.markAllAsTouched();
    return this.form.valid;
  }

  // @ts-ignore
  get _form(): Record<string, any>{
    let details: DetailValue[] = this.getFormControls('details').value
    
    return {
      cards: details.filter(d => d.type == 'card').filter(d => d.value && d.type).map(d => d.value),
      cryptowallets: details.filter(d => d.type == 'cryptowallet').filter(d => d.value && d.type).map(d => d.value),
    }
  }

  set _form(val: Owner){
    this.lastData = val.payment.details;

    let cards: DetailValue[] = val.payment.details.cards.map(v => { return { type: 'card', value: v } })
    let wallets: DetailValue[] = val.payment.details.cryptowallets.map(v => { return { type: 'cryptowallet', value: v } })

    let value = cards.concat(wallets)
    this.getFormControls('details').clear();

    value.forEach(v => 
      this.getFormControls('details').push(new UntypedFormControl(v))
    )

    if ( this.getFormControls('details').length == 0 )
      this.getFormControls('details').push(new UntypedFormControl({ type: '', value: '' }))
  }

  getFormControls(controlName: string): UntypedFormArray{
    return this.form.controls[controlName] as UntypedFormArray
  }

  addControl(){
    this.getFormControls('details').push(new UntypedFormControl())
  }

  close( save: boolean ){
    // if ( !save )
    //   // @ts-ignore
    //   this._form = { payment_details: this.lastData }
    // else
    //   // @ts-ignore
    //   this.lastData = this._form;
    
    this.onClose.emit();
  }

}
