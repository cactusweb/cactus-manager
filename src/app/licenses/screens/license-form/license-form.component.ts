import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { finalize, Subscription, take, tap } from 'rxjs';
import { AccountService } from 'src/app/account/services/account.service';
import { SelectorValue } from 'src/app/tools/interfaces/selector-values';
import { ToolsService } from 'src/app/tools/services/tools.service';
import { License } from '../../interfaces/license';
import { LicensesService } from '../../services/licenses.service';

@Component({
  selector: 'app-license-form',
  templateUrl: './license-form.component.html',
  styleUrls: ['./license-form.component.scss']
})
export class LicenseFormComponent implements OnInit {
  @Output() onClose = new EventEmitter();

  @Input() license: License | null = null
  licenseKey: string | null = null;

  form!: FormGroup
  sub!: Subscription;
  loading: boolean = false;

  dsRoleOptions: SelectorValue[] = []

  @Output() onPost = new EventEmitter<License>()


  constructor(
    private acc: AccountService,
    private tools: ToolsService,
    private http: LicensesService
  ) { }

  ngOnInit(): void {
    this.generateForm();
    this.getDsRoles();
    this.licenseKey = this.license?.key || null;
  }

  
  @HostListener('document:keydown.escape', ['$event'])
  onEscape(e: KeyboardEvent){
    this.onClose.emit();
  }

  generateForm(){
    this.form = new FormGroup({
      type: new FormControl( 'renewal', [Validators.required] ),
      unbindable: new FormControl( false ),
      price: new FormControl( null, Validators.required ),
      expires_in: new FormControl( new Date().toISOString().split('T')[0], Validators.required ),
      roles: new FormControl( [] ),
      activations: new FormControl( null, [ Validators.required ] ),
      description: new FormControl( null )
    })
    this.subOnLicenseType()

    if ( !this.license ) return

    this.form.patchValue({
      ...this.license,
      price: this.license.payment.price,
      activations: this.license.activations.quantity,
      expires_in: new Date(this.license.expires_in).toISOString().split('T')[0],
      roles: this.license.discord.roles.map(r => r.id)
    })

  }

  subOnLicenseType(){
    this.sub = this.form.controls['type'].valueChanges.subscribe(v => {
      let type: 'disable' | 'enable' = v !== 'lifetime' ? 'enable' : 'disable';
      this.form.controls['price'][type]();
      this.form.controls['expires_in'][type]();
    })
  }

  getDsRoles(){
    this.acc.roles.pipe(take(1)).subscribe(roles => 
      this.dsRoleOptions = roles.map(r => {
        return { display: r.name, value: r.id }
      })
    )
  }


  onSubmit(){
    this.form.markAllAsTouched();
    
    if ( this.form.controls['activations'].invalid ) this.tools.generateNotification('Set activations count!')

    if ( this.form.invalid ) return;
    
    this.loading = true;

    let data = { 
      ...this.form.value, 
      expires_in: this.form.controls['type'].value == 'lifetime' ? null : new Date(this.form.controls['expires_in'].value).toISOString() 
    }
    let postFunc = this.license ? this.http.putLicense( data, this.license.id ) : this.http.postLicense( data )


    postFunc
      .pipe(
        take(1),
        finalize(() => this.loading = false),
        tap(l => this.onPost.emit(l)),
        tap(l => this.licenseKey = l.key)
      )
      .subscribe({
        next: (lic: License) => this.license = this.license ? lic : null,
        error: () => this.licenseKey = this.license ? this.licenseKey : null,
      })
      
  }

}
