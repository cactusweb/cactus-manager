import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url = 'api/v1/auth';
  headers: HttpHeaders;

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  async ownerLogin(data){
    return await this.http.post(`${this.url}/signin`, data).toPromise();
  }

  async ownerSignUp(data){
    return await this.http.post(`${this.url}/signup`, data).toPromise();
  }

  async adminLogin(data){
    return await this.http.post(`${this.url}/admin`, data).toPromise();
  }

  adminLogout(){
    localStorage.removeItem('adminAccessToken');
    this.router.navigate(['/admin-login']);
  }

  ownerLogout(){
    localStorage.removeItem('ownerAccessToken');
    localStorage.removeItem('ownerName');
    localStorage.removeItem('ownerEmail');
    this.router.navigate(['/login']);
  }

  setAdminToken(token: string){
    localStorage.setItem('adminAccessToken', token);
  }

  setOwnerToken(token: string){
    localStorage.setItem('ownerAccessToken', token);
  }


}
