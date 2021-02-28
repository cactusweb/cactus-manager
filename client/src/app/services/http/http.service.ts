import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { header } from 'express-validator';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  localUrl = environment.localApiUrl;
  url = environment.apiUrl;
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
    return await this.http.get(`${this.url}/license`, { headers: this.headers }).toPromise();
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
    return await this.http.get( `${this.url}/@me`, { headers: this.headers } ).toPromise();
  }

  async putSelf( data ){
    this.setHeaders();
    return await this.http.put( `${this.url}`, data, { headers: this.headers } ).toPromise();
  }

  async postFile( formData, dirname: string = 'customer' ){
    this.setHeaders();
    return await this.http.post( `${this.url}/upload/${dirname}`, formData, { headers: this.headers } ).toPromise();
  }

  async postDrop(data){
    this.setHeaders();
    return await this.http.post( `${this.url}/drop`, data, { headers: this.headers } ).toPromise();
  }

  async getDrops(){
    this.setHeaders();
    return await this.http.get( `${this.url}/drop`, { headers: this.headers } ).toPromise();
  }

  async getPlans(){
    this.setHeaders();
    return await this.http.get( `${this.url}/plan`, { headers: this.headers } ).toPromise();
  }

}
