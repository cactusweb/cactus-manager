import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, share, take, tap } from 'rxjs';
import { DsRole } from 'src/app/tools/interfaces/ds-role';
import { HttpService } from 'src/app/tools/services/http.service';
import { Requests } from '../consts';
import { Owner } from '../interfaces/owner';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private $owner = new BehaviorSubject<Owner|null>(null)
  public owner = this.$owner.asObservable()

  private $roles = new BehaviorSubject<DsRole[]>([]);
  public roles = this.$roles.asObservable();

  loading: boolean = false

  lastAccUpdate: number = 0
  lastReqErr: boolean = false

  constructor(
    private http: HttpService
  ) { }


  async getOwnerData(){
    let ownerLoaded: boolean = true;

    this.owner.pipe(take(1))
      .subscribe(res => ownerLoaded = !!res)

    if ( this.lastAccUpdate >= (Date.now() - 1000*30) && !this.lastReqErr && ownerLoaded || this.lastAccUpdate >= (Date.now() - 500) ) return

    this.lastAccUpdate = Date.now()

    this.http.request( Requests['getOwner'] )
      .pipe(
        take(1),
        tap(w => this.$owner.next(w)),
        tap((w: Owner) => this.$roles.next(w.discord.roles)),
        tap(() => this.lastReqErr = false),
        catchError(err => {
          this.lastReqErr = true
          return err
        })
      )
      .subscribe({
        next: undefined,
        error: undefined,
      })
  }

  onLogout(){
    this.$owner.next(null);
  }

  public putOwnerData(data: Owner){
    this.$owner.next(data)
  }
}
