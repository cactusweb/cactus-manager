import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url = environment.apiUrl;
  headers: HttpHeaders;

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  async login(data){
    return await this.http.post(`${this.url}/sign-in`, data).toPromise();
  }
  

  async signUp(data){
    return await this.http.post(`${this.url}/sign-up`, data).toPromise();
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
