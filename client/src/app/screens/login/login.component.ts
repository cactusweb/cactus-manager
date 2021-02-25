import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from '../../services/auth/auth.service';
import { SeoService } from '../../services/seo/seo.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
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
    this.loginForm = new FormGroup({
      email: new FormControl({ value: '', disabled: false }, [Validators.required, Validators.email]),
      password: new FormControl({ value: '', disabled: false }, [Validators.required])
    })
  }


  async login(){
      this.spinner.show();
      await this.auth.login(this.loginForm.value)
        .then( (w: any) => {
          this.auth.setToken(w.accessToken);
          this.router.navigate(['/account']);
        })
        .catch(e => {
          console.log(e)
          this.errorMessage = e.error.message || e.error.error;
          this.spinner.hide();
        })
  }


}
