import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  url = 'api/v1';
  headers: HttpHeaders;

  constructor(
    private http: HttpClient
  ) { }

  setHeaders(){
    let token = localStorage.getItem('accessToken');
    this.headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  async postNewLicense(data){
    this.setHeaders();
    return await this.http.post(`${this.url}/licenses`, data, { headers: this.headers }).toPromise();
  }

  async getLicenses(){
    this.setHeaders();
    return await this.http.get(`${this.url}/licenses`, { headers: this.headers }).toPromise();
  }

  async deleteLicense(id: string){
    this.setHeaders();
    return await this.http.delete(`${this.url}/licenses/${id}`, {headers: this.headers}).toPromise();
  }

  async putLicense(data){
    this.setHeaders();
    return await this.http.patch( `${this.url}/licenses/${data.id}`, data, { headers: this.headers } ).toPromise();
  }

  async getSelf(){
    this.setHeaders();
    return await this.http.get( `${this.url}/users/@me`, { headers: this.headers } ).toPromise();
  }

}
