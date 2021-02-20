import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
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
    private activatedRoute: ActivatedRoute,
    private seo: SeoService,
    private auth: AuthService,
    private router: Router,
    private spinner: NgxSpinnerService,
  ) {
    let data: any = this.activatedRoute.data.pipe();
    data = data._value;
    this.seo.changeTitle(data.title);
    this.seo.changeUrl(this.router.url);
  }

  ngOnInit(): void {
    this.signUpForm = new FormGroup({
      name: new FormControl({ value: '', disabled: false }, [ Validators.required ]),
      email: new FormControl({ value: '', disabled: false }, [ Validators.required, Validators.email ]),
      password: new FormControl({ value: '', disabled: false }, [ Validators.required, Validators.minLength(6) ]),
      key: new FormControl({ value: '', disabled: false }, [ Validators.required ])
    })
  }

  async signUp(){
    this.errorMessage = '';
    this.spinner.show();
    await this.auth.signUp(this.signUpForm.value)
      .then( (w: any) => {
        this.auth.setToken(w.accessToken);
        this.router.navigate(['/account']);
      })
      .catch(e => {
        console.log(e)
        this.errorMessage = e.error.message;
        this.spinner.hide();
      })
  }

}
