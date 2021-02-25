import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { header } from 'express-validator';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  localUrl = environment.localApiUrl;
  url = environment.apiUrl + '/owner';
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
    return await this.http.post(`${this.localUrl}/licenses`, data, { headers: this.headers }).toPromise();
  }

  async getLicenses(){
    this.setHeaders();
    return await this.http.get(`${this.localUrl}/licenses`, { headers: this.headers }).toPromise();
  }

  async deleteLicense(id: string){
    this.setHeaders();
    return await this.http.delete(`${this.localUrl}/licenses/${id}`, {headers: this.headers}).toPromise();
  }

  async putLicense(data){
    this.setHeaders();
    return await this.http.patch( `${this.localUrl}/licenses/${data._id}`, data, { headers: this.headers } ).toPromise();
  }

  async getSelf(){
    this.setHeaders();
    return await this.http.get( `${this.localUrl}/users/@me`, { headers: this.headers } ).toPromise();
  }

  async putSelf( data ){
    this.setHeaders();
    return await this.http.patch( `${this.localUrl}/users`, data, { headers: this.headers } ).toPromise();
  }

  async postFile( formData, dirname: string = 'client' ){
    this.setHeaders();
    return await this.http.post( `${this.localUrl}/uploads/${dirname}`, formData, { headers: this.headers } ).toPromise();
  }

  async postDrop(data){
    this.setHeaders();
    return await this.http.post( `${this.url}/drop`, data, { headers: this.headers } ).toPromise();
  }

  async getDrops(){
    this.setHeaders();
    return await this.http.get( `${this.url}/drop`, { headers: this.headers } ).toPromise();
  }

}
