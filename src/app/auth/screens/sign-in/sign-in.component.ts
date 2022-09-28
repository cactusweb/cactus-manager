import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { take, finalize, catchError } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  loginForm!: FormGroup;
  error: string = '';

  loading: boolean = false;

  constructor(
    private auth: AuthService
  ) { }

  ngOnInit(): void {
    this.generateForm()
  }

  generateForm(){
    this.loginForm = new FormGroup({
      email: new FormControl({ value: '', disabled: false }, [Validators.required, Validators.email]),
      password: new FormControl({ value: '', disabled: false }, [Validators.required])
    })
  }

  onLogin(){
    this.loginForm.markAllAsTouched();

    if ( this.loginForm.invalid ) return;

    this.loading = true;
    this.auth.auth( 'login', this.loginForm.value )
      .pipe(
        take(1),
        catchError((err) => {
          this.loading = false
          return err
        })
      )
      .subscribe({
        next: undefined,
        error: (err) => this.error = err.error,
      })
  }


}
