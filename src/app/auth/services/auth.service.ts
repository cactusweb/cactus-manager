import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { take, tap } from 'rxjs';
import { AccountService } from 'src/app/account/services/account.service';
import { HttpService } from 'src/app/tools/services/http.service';
import { Requests } from '../consts';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private router: Router,
    private http: HttpService,
    private acc: AccountService
  ) { }

  auth( reqName: string, data: any ){
    return this.http.request( Requests[reqName], data )
      .pipe(
        take(1),
        tap(d => {
          localStorage['accessToken'] = d.access_token;
          this.router.navigate(['/account'])
        })
      )
  }


  logout(){
    localStorage.removeItem('accessToken')
    this.router.navigate(['/auth'])
    this.acc.onLogout();
  }

}
