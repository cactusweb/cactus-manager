import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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
  formPlan: FormGroup;
  roles: string = '';

  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private http: HttpService,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit(): void {
    this.generateForm();
  }

  generateForm(  ){
    let disabled = false;
    this.formPlan = new FormGroup({
      name: new FormControl( { value: '', disabled: disabled }, [ Validators.required ] ),
      quantity: new FormControl( { value: '', disabled: disabled }, [ Validators.required, Validators.pattern('[0-9]*') ] ),
      unbindable: new FormControl( { value: '', disabled: disabled }, [ Validators.required ] ),
      status: new FormControl( { value: '', disabled: disabled }, [ Validators.required ] ),
      renewalPrice: new FormControl( { value: '', disabled: disabled }, [ Validators.required, Validators.pattern('[0-9]*') ] ),
      price: new FormControl( { value: '', disabled: disabled }, [ Validators.required, Validators.pattern('[0-9]*') ] ),
      roles: new FormControl( { value: '', disabled: disabled }, [ Validators.required ] )
      // quantity: 0,
      // unbindable: true,
      // status: lifetime,
      // expiresIn: 2021-03-01T22:20:58.808Z,
      // renewalPrice: 0,
      // price: 0,
    })
  }

  async onAddPlan(){
    this.successMessage = '';
    this.errorMessage = '';
    this.spinner.show();
    await this.http.postPlan( this.formPlan.value )
      .then( w => {
        this.successMessage = 'Successfull added';
        this.onNewItem.emit(w);
      })
      .catch( e => {
        this.errorMessage = e.error.error || e.error.message || e.error;
      })
    this.spinner.hide();
  }

  onChangeRoles(){
    this.formPlan.value.roles = this.roles.split(' ').join('').split(',');
  }

}
