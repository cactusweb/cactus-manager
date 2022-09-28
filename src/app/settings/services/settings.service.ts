import { Injectable } from '@angular/core';
import { take, tap } from 'rxjs';
import { AccountService } from 'src/app/account/services/account.service';
import { HttpService } from 'src/app/tools/services/http.service';
import { Requests } from '../const';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor(
    private http: HttpService,
    private acc: AccountService
  ) { }

  public putSettings( data: Record<string,any> ){
    
  }

  public postAvatar( file: FormData ){
    return this.http.request( Requests['postFile'], file, 'avatar' )
      .pipe(
        tap(a => this.onNewAvatar(a.avatar))
      )
  }


  private onNewAvatar(url: string){
    this.acc.owner
      .pipe(take(1))
      .subscribe(res => {
        if ( !res ) return;
        res.uploads.avatar = url;
        this.acc.putOwnerData(res)
      })
  }

}
