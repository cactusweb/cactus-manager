import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize, take } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth/auth.service';
import { SeoService } from 'src/app/services/seo/seo.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signUpForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private auth: AuthService,
    private router: Router,
    private spinner: NgxSpinnerService,
  ) {
  }

  ngOnInit(): void {
    this.signUpForm = new FormGroup({
      name: new FormControl({ value: '', disabled: false }, [ Validators.required ]),
      email: new FormControl({ value: '', disabled: false }, [ Validators.required, Validators.email ]),
      password: new FormControl({ value: '', disabled: false }, [ Validators.required, Validators.minLength(6) ]),
      key: new FormControl({ value: '', disabled: false }, [ Validators.required ])
    })
  }

  signUp(){
    this.errorMessage = '';
    this.spinner.show();
    this.auth.registr(this.signUpForm.value)
      .pipe( take(1), finalize( () => this.spinner.hide() ) )  
      .subscribe( res => this.router.navigate(['/account']), err => { this.errorMessage = err.error.message || err.error.error; } )
    

      // .then( (w: any) => {
      //   this.auth.setToken(w.access_token);
      //   this.router.navigate(['/account']);
      // })
      // .catch(e => {
      //   console.log(e)
      //   
      //   this.spinner.hide();
      // })
  }

}