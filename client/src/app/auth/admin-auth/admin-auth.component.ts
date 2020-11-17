import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  selector: 'app-admin-auth',
  templateUrl: './admin-auth.component.html',
  styleUrls: ['./admin-auth.component.css']
})
export class AdminAuthComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private auth: AuthService,
    private router: Router,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit(): void {
    this.loginForm= new FormGroup({
      login: new FormControl({ value: '', disabled: false}, [Validators.required]),
      password: new FormControl({ value: '', disabled: false}, [Validators.required])
    })
  }

  async login(){
    if (this.loginForm.valid){
      this.spinner.show();
      await this.auth.adminLogin(this.loginForm.value)
        .then( (w: any) =>{
          this.auth.setAdminToken(w.accessToken);
          this.router.navigate(['/admin']);
        })
        .catch(e => {console.log(e); this.spinner.hide();})
    }
  }

}
