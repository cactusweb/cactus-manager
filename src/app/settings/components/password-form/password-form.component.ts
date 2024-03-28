import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { finalize, take } from 'rxjs';
import { HttpService } from 'src/app/tools/services/http.service';
import { ToolsService } from 'src/app/tools/services/tools.service';
import { Requests } from '../../const';

@Component({
  selector: 'app-password-form',
  templateUrl: './password-form.component.html',
  styleUrls: ['./password-form.component.scss']
})
export class PasswordFormComponent implements OnInit {
  form!: UntypedFormGroup
  loading: boolean = false;

  @Output() onClose = new EventEmitter();

  constructor(
    private http: HttpService,
    private tools: ToolsService
  ) { }

  ngOnInit(): void {
    this.generateForm();
  }

  
  @HostListener('document:keydown.escape', ['$event'])
  onEscape(e: KeyboardEvent){
    this.onClose.emit();
  }

  generateForm(){
    this.form = new UntypedFormGroup({
      current_password: new UntypedFormControl(null, Validators.required),
      new_password: new UntypedFormControl(null, Validators.required)
    })
  }



  onSubmit(){
    this.form.markAllAsTouched();

    if ( this.form.invalid ) return;

    this.loading = true;

    this.http.request( Requests['changePassword'], this.form.value )
      .pipe(
        take(1),
        finalize(() => this.loading = false)
      )
      .subscribe({
        next: () => {},
        error: () => {},
        complete: () => this.tools.generateNotification('Password changed!', 'success')
      })
  }

}
