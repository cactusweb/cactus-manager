import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { take, finalize, catchError } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  registrForm!: FormGroup;
  error: string = '';

  loading: boolean = false;

  constructor(
    private auth: AuthService
  ) { }

  ngOnInit(): void {
    this.generateForm();
  }

  generateForm(){
    this.registrForm = new FormGroup({
      name: new FormControl({ value: '', disabled: false }, [ Validators.required ]),
      email: new FormControl({ value: '', disabled: false }, [ Validators.required, Validators.email ]),
      password: new FormControl({ value: '', disabled: false }, [ Validators.required, Validators.minLength(6) ]),
      key: new FormControl({ value: '', disabled: false }, [ Validators.required ])
    })
  }

  onRegistr(){
    this.registrForm.markAllAsTouched();

    if ( this.registrForm.invalid ) return;

    this.loading = true;
    this.auth.auth( 'registr', this.registrForm.value )
      .pipe(
        take(1),
        catchError((err) => {
          this.loading = false
          return err
        })
      )
      .subscribe({
        next: undefined,
        error: err => this.error = err.error
      })
  }

}
