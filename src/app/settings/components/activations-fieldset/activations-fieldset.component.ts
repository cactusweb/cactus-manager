import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { AdditionalActiovationPlan, Owner } from 'src/app/account/interfaces/owner';
import { ToolsService } from 'src/app/tools/services/tools.service';
import { SettingsFieldset } from '../../settings.component';

@Component({
  selector: 'app-activations-fieldset',
  templateUrl: './activations-fieldset.component.html',
  styleUrls: ['./activations-fieldset.component.scss']
})
export class ActivationsFieldsetComponent implements OnInit, SettingsFieldset {
  form!: FormGroup

  doubleInputStruct = {
    param1: { name: 'duration', placeholder: 'Duration', icon: 'days' },
    param2: { name: 'price', placeholder: 'Price' }
  }

  @Output() onClose = new EventEmitter()

  constructor(
    private tools: ToolsService
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      plans: new FormArray([], Validators.required)
    })

  }

  validate(): boolean{
    let valid = (this.form.get('plans')!.value as AdditionalActiovationPlan[])
      .filter( v => 
        v && !this.isNullOrUndefined(v.duration) && v.price 
      )
      .length !== 0

    if ( !valid )
      this.tools.generateNotification( "Add at least one activations plan", 'err' )

    return valid && this.form.valid;
  }
    
  // @ts-ignore
  get _form(): Record<string, any>{
    let value = this.form.get('plans')!.value as AdditionalActiovationPlan[];
    return value
      .filter( v => v && !this.isNullOrUndefined(v.duration) && v.price )
      .map( v => {
        return { 
          duration: v.duration === 0 ? null : v.duration, 
          price: Number(v.price) 
        }
      })
  }

  set _form(val: Owner){
    val.additional_activations.plans.forEach(p => {
      if ( !p.duration )
       p = { duration: 0, price: p.price }
      this.addControl(p)
    })

    if ( val.additional_activations.plans.length == 0 )
      this.addControl();
  }

  getFormControlAsArr(name: string): FormArray{
    return this.form.get(name) as FormArray
  }
  
  addControl( value: AdditionalActiovationPlan|null = null ){
    (this.form.get('plans') as FormArray).push(new FormControl(value))
  }

  isNullOrUndefined(number: any) {
    return number === undefined && number === null
  }
}

