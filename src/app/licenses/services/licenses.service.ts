import { Injectable } from '@angular/core';
import { take, map, finalize, tap, BehaviorSubject, share, Observable } from 'rxjs';
import { spinnerName } from 'src/app/account/consts';
import { HttpService } from 'src/app/tools/services/http.service';
import { ToolsService } from 'src/app/tools/services/tools.service';
import { Requests } from '../const';
import { License } from '../interfaces/license';

@Injectable({
  providedIn: 'root'
})
export class LicensesService {
  private licenses!: License[]

  constructor(
    private http: HttpService,
    private tools: ToolsService
  ) { }

  public getLicenses( update: boolean = false ): Observable<License[]>{
    
    if ( this.licenses && !update )
      return new BehaviorSubject(this.licenses).asObservable().pipe(share())
    
    return this.fetchLicenses();
  }


  public deleteLicense(id: string){
    return this.http.request(Requests['deleteLicense'], null, id)
      .pipe(
        tap(() => {
          this.licenses = this.licenses.filter(l => l.id !== id)
        }),
        tap(() => this.tools.generateNotification('License deleted', 'primary'))
      )
  }

  public renewLicense(id: string){
    return this.http.request(Requests['renewLicense'], null, id)
      .pipe(
        map(l => { return { ...l, expires_in: l.expires_in*1000 } }),
        tap(newL => this.licenses = this.licenses.map(l => {
            if ( l.id != l.id ) return l;
            return newL;
        })),
        tap(() => this.tools.generateNotification('License renewed', 'success'))
      )
  }

  public postLicense( data: Record<any,any> ){
    return this.http.request(Requests['postLicense'], data)
      .pipe(
        map(l => { return { ...l, expires_in: l.expires_in*1000 } }),
        tap(l => this.licenses.push(l)),
        tap(() => this.tools.generateNotification('Generated!', 'success')),
        tap(l => this.tools.copy(l.key, 'License key copied'))
      )
  }

  public putLicense( data: Record<any, any>, id: string ){
    return this.http.request( Requests['putLicense'], data, id )
      .pipe(
        map(l => { return { ...l, expires_in: l.expires_in*1000 } }),
        tap(newL => this.licenses = this.licenses.map(l => {
          if ( l.id != id ) return l;
          return newL;
        })),
        tap(() => this.tools.generateNotification('License edited!', 'success'))
      )
  }


  public resetPoints( licId?: string ){
    
    let reset = () => this.licenses = this.licenses.map(l => { 
                        if ( licId && l.id !== licId || !l.referral ) return l;
                        return { ...l, referral: { ...l.referral, score: 0 } }
                      })

    return this.http.request( Requests['resetRefPoints'], null, undefined, licId ? `/${licId}` : '' )
      .pipe(
        tap(() => reset())
      )
  }


  private fetchLicenses(){
    return this.http.request(Requests['getLicenses'])
      .pipe(
        map(licenses => licenses.map((l: License) => {
          return { 
            ...l,
            expires_in: l.type == 'lifetime' ? 100000000000000 : Number(l.expires_in) * 1000,
            created_at: Number(l.created_at) * 1000,
          }
        })),
        tap(d => this.licenses = d)
      )
  }

}
