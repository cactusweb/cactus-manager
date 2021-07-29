import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { take } from 'rxjs/operators';
import { Requests } from 'src/app/const';
import { HttpService } from 'src/app/services/http/http.service';

@Component({
  selector: 'app-password-change-form',
  templateUrl: './password-change-form.component.html',
  styleUrls: ['./password-change-form.component.css']
})
export class PasswordChangeFormComponent implements OnInit {
  @Output() onClose = new EventEmitter()

  passwordForm: FormGroup;
  isError: boolean = false;
  message: string = '';

  constructor(
    private http: HttpService,
  ) { }

  ngOnInit(): void {
    this.generateForm()
  }

  generateForm(){
    this.passwordForm = new FormGroup({
      current_password: new FormControl( '', Validators.required ),
      new_password: new FormControl( '', [ Validators.required, Validators.minLength(6) ] )
    })
  }


  onSubmit(){
    this.isError = false;
    this.message = '';
    this.passwordForm.markAllAsTouched();

    this.http.request( Requests.changePassword, this.passwordForm.value )
      .pipe( take(1) )
      .subscribe(
        res => this.message = 'Successful change',
        err => {
          this.message = err.error?.error || err.error?.message || err.message || 'Smth went wrong';
          this.isError = true;
        }
      )
  }

}
