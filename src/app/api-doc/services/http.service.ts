import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, share, tap } from 'rxjs';
import { Request } from '../interfaces/request';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private requests: Request[] | null = null;

  constructor(
    private http: HttpClient
  ) { }

  getRequestsData(): Observable<Request[]>{
    if ( this.requests ) 
      return new BehaviorSubject(this.requests).asObservable().pipe(share())

    return this.http.get<Request[]>( '/assets/api-doc.json' )
      .pipe(
        tap(data => this.requests = data)
      )
  }
}
