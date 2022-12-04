import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { filter, Subscription, take } from 'rxjs';
import { Owner } from 'src/app/account/interfaces/owner';
import { AccountService } from 'src/app/account/services/account.service';
import { SelectorValue } from 'src/app/tools/interfaces/selector-values';

const actionOpts: SelectorValue[] = [
  { value: 'ticket', display: "Open a ticket" },
  { value: 'kick', display: 'Kick from the server' },
  { value: 'roles', display: 'Give new role' }
] 

@Component({
  selector: 'app-payment-calls-fieldset',
  templateUrl: './payment-calls-fieldset.component.html',
  styleUrls: ['./payment-calls-fieldset.component.scss']
})
export class PaymentCallsFieldsetComponent implements OnInit {
  @Output() onClose = new EventEmitter()

  form!: FormGroup
  sub!: Subscription

  actionOpts = actionOpts;
  dsRoleOpts: SelectorValue[] = [];

  constructor(
    private acc: AccountService
  ) { }

  
  @HostListener('document:keydown.escape', ['$event'])
  onEscape(e: KeyboardEvent){
    this.onClose.emit();
  }
  
  ngOnInit(): void {
    this.generateForm();
    this.getDsRoles();
  }

  generateForm(){
    this.form = new FormGroup({
      attempts: new FormControl(3, Validators.required),
      role: new FormControl({ value: null, disabled: true }, Validators.required),
      action: new FormControl('ticket', Validators.required)
    })

    this.sub = this.form.controls['action'].valueChanges
      .subscribe(res => this.form.controls['role'][res == 'roles' ? 'enable' : 'disable']() )
  }

  
  getDsRoles(){
    this.acc.roles.pipe(filter(r => r.length > 0), take(1)).subscribe(roles => 
      this.dsRoleOpts = roles.map(r => {
        return { display: r.name, value: r.id }
      })
    )
  }

  // @ts-ignore
  get _form(): Record<any,any>{
    return this.form.value;
  }

  set _form(owner: Owner){
    this.form.patchValue(owner.payment.calls)
  }

}
