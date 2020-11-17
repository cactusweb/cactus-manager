import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  url = 'api/v1/admin';
  headers: HttpHeaders;

  constructor(
    private http: HttpClient,
  ) { }
  
  setHeader(){
    let token = localStorage.getItem('adminAccessToken');
    this.headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  async newRegKey(key: string){
    this.setHeader();
    return await this.http.post(`${this.url}/regkey`, {key: key}, {headers: this.headers}).toPromise();
  }

  async getUsers(){
    this.setHeader();
    return await this.http.get(`${this.url}/users`, { headers: this.headers }).toPromise();
  }

  async deleteUser(id: string){
    this.setHeader();
    let opt = { headers: this.headers, body: { id : id } }
    return await this.http.delete(`${this.url}/users`, opt).toPromise();
  }

  async putUser(data){
    this.setHeader();
    return await this.http.patch(`${this.url}/users`, data, { headers: this.headers }).toPromise();
  }

}
