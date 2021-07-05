import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { Requests } from 'src/app/const';
import { environment } from 'src/environments/environment';
import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url = environment.apiUrl;
  headers: HttpHeaders;

  constructor(
    private http: HttpService,
    private router: Router
  ) { }

  login(data){
    return this.http.request ( Requests.login, data )
      .pipe( tap( data => this.setToken( data.access_token ) ) )
  }
  

  registr(data){
    return this.http.request( Requests.registr, data )
      .pipe( tap( data => this.setToken( data.access_token ) ) )
  }

  logout(){
    localStorage.removeItem('accessToken');
    localStorage.removeItem('name');
    localStorage.removeItem('email');
    this.router.navigate(['/login']);
  }

  setToken(token: string){
    localStorage.setItem('accessToken', token);
  }


}
