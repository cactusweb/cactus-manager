import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpService } from 'src/app/services/http/http.service';

@Component({
  selector: 'app-plan-gen',
  templateUrl: './plan-gen.component.html',
  styleUrls: ['./plan-gen.component.scss']
})
export class PlanGenComponent implements OnInit {

  @Output() onClose = new EventEmitter<boolean>();
  @Output() onNewItem = new EventEmitter<{}>();
  @Input() viewingPlan; 
  formPlan: FormGroup;
  roles: string = '';
  infinityActivating: boolean = false;

  isError: boolean = true;
  message: string = '';

  constructor(
    private http: HttpService,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit(): void {
    this.generateForm();
    console.log( this.viewingPlan )
  }

  generateForm(  ){
    let disabled = this.viewingPlan ? true : false;
    this.formPlan = new FormGroup({
      name: new FormControl( { value: this.viewingPlan?.name || '', disabled: disabled }, [ Validators.required ] ),
      activations: new FormControl( { value: this.viewingPlan?.activations || '', disabled: disabled }, [ Validators.required, Validators.pattern('[0-9]*') ] ),
      unbindable: new FormControl( { value: this.viewingPlan?.unbindable || false, disabled: disabled }, [ Validators.required ] ),
      license_status: new FormControl( { value: this.viewingPlan?.license_status || 'renewal', disabled: disabled }, [ Validators.required ] ),
      renewal_price: new FormControl( { value: this.viewingPlan?.renewal_price || '', disabled: disabled }, [ Validators.required, Validators.pattern('[0-9]*') ] ),
      roles: new FormControl( { value: [], disabled: disabled }, [ Validators.required ] )
    })

    this.roles = '';
     this.viewingPlan?.roles?.forEach(role => {
       this.roles += `${role.id}, `
     });
  }
  
  onInfinity(){
    this.infinityActivating ? this.formPlan.controls.quantity.disable() : this.formPlan.controls.quantity.enable()
  }

  async onAddPlan(){
    this.message = '';

    this.formPlan.value.quantity = this.infinityActivating ? 0 : this.formPlan.value.quantity;
    this.setRoles()
    this.setBoolType();
    this.spinner.show();
    await this.http.postPlan( this.formPlan.value )
      .then( w => {
        this.isError = false;
        this.message = 'Successful added';
        this.onNewItem.emit(w);
      })
      .catch( e => {
        this.isError = true;
        this.message = e.error.error || e.error.message || e.error;
      })
    this.spinner.hide();
  }

  setRoles(){
    this.formPlan.value.roles = this.roles.trim() ? this.roles.split(' ').join('').split(',') : [];
  }
  
  setBoolType(){
    this.formPlan.value.unbindable = this.formPlan.value.unbindable == 'true';
  }

}
