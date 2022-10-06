import { Injectable } from '@angular/core';
import { take, map, finalize, tap, BehaviorSubject, share, Observable, catchError } from 'rxjs';
import { spinnerName } from 'src/app/account/consts';
import { HttpService } from 'src/app/tools/services/http.service';
import { ToolsService } from 'src/app/tools/services/tools.service';
import { Requests } from '../const';
import { License } from '../interfaces/license';

@Injectable({
  providedIn: 'root'
})
export class LicensesService {
  private _licenses!: License[]
  private $licenses = new BehaviorSubject<License[]|null>(null)

  constructor(
    private http: HttpService,
    private tools: ToolsService
  ) { }

  
  public getLicenses( update: boolean = false ): Observable<License[]|null>{
    
    if ( !this._licenses || update )
      this.updateLicenses()
        .subscribe({
          next: () => {},
          error: () => {}
        })

    return this.$licenses.asObservable()
  }

  
  public deleteLicense(id: string){
    return this.http.request(Requests['deleteLicense'], null, id)
      .pipe(
        tap(() => {
          this._licenses = this._licenses.filter(l => l.id !== id)
        }),
        tap(() => this.tools.generateNotification('License deleted', 'primary')),
        tap(d => this.$licenses.next(this._licenses))
      )
  }


  public renewLicense(id: string){
    return this.http.request(Requests['renewLicense'], null, id)
      .pipe(
        map(l => { return { ...l, expires_in: l.expires_in*1000 } }),
        tap(newL => this._licenses = this._licenses.map(l => {
            if ( l.id != id ) return l;
            return newL;
        })),
        tap(() => this.tools.generateNotification('License renewed', 'success')),
        tap(d => this.$licenses.next(this._licenses))
      )
  }

  public postLicense( data: Record<any,any> ){
    return this.http.request(Requests['postLicense'], data)
      .pipe(
        map(l => { return { ...l, expires_in: l.expires_in*1000 } }),
        tap(l => this._licenses.push(l)),
        tap(() => this.$licenses.next(this._licenses)),
        tap(d => console.log(d)),
        tap(() => this.tools.generateNotification('Generated!', 'success')),
        tap(l => this.tools.copy(l.key, 'License key copied')),
      )
  }

  public putLicense( data: Record<any, any>, id: string ){
    return this.http.request( Requests['putLicense'], data, id )
      .pipe(
        map(l => { return { ...l, expires_in: l.expires_in*1000 } }),
        tap(newL => this._licenses = this._licenses.map(l => {
          if ( l.id != id ) return l;
          return newL;
        })),
        tap(() => this.$licenses.next(this._licenses)),
        tap(() => this.tools.generateNotification('License edited!', 'success'))
      )
  }
  
  
  public resetPoints( licId?: string ){
    
    let reset = () => this._licenses = this._licenses.map(l => { 
                        if ( licId && l.id !== licId || !l.referral ) return l;
                        return { ...l, referral: { ...l.referral, score: 0 } }
                      })

    return this.http.request( Requests['resetRefPoints'], null, undefined, licId ? `/${licId}` : '' )
      .pipe(
        tap(() => reset()),
        tap(() => this.$licenses.next(this._licenses)),
        tap(() => this.tools.generateNotification('Points reseted', 'success'))
      )
  }

  
  public updateLicenses(){
    return this.http.request(Requests['getLicenses'])
      .pipe(
        map(licenses => licenses.map((l: License) => {
          return { 
            ...l,
            expires_in: l.type == 'lifetime' ? 100000000000000 : Number(l.expires_in) * 1000,
            created_at: Number(l.created_at) * 1000,
          }
        })),
        tap(d => this._licenses = d),
        tap(d => this.$licenses.next(this._licenses)),
        catchError(err => {
          if ( !this._licenses ){
            this.$licenses.error(err);
            this.$licenses = new BehaviorSubject<License[]|null>(null)
          }
          return err
        })
      )
  }

  justMap(){
    this.$licenses.next(this._licenses);
  }
}
