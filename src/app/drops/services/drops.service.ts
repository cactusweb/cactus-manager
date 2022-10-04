import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, share, throwError } from 'rxjs';
import { HttpService } from 'src/app/tools/services/http.service';
import { Requests } from '../const';
import { Drop } from '../interfaces/drop';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DropsService {
  private drops!: Drop[];
  private $drops = new BehaviorSubject<Drop[]>([])

  constructor(
    private http: HttpService
  ) { }

  getDrops( update: boolean = false ): Observable<Drop[]>{

    if ( update ) 
      this.http.request( Requests['getDrops'] )
        .pipe(
          map((drops: Drop[]) => drops.map(d => { 
            return { ...d, start_at: d.start_at*1000 }
          })),
          tap(d => {
            this.drops = d.reverse();
            this.$drops.next(this.drops)
          }),
          catchError(err => {
            this.$drops.error(err)
            return err
          })
        ).subscribe({ 
          next: () => {}, 
          error: () => this.$drops = new BehaviorSubject<Drop[]>(this.drops||[]) 
        })
    
    return this.$drops.asObservable().pipe(share());
  }

  

  deleteDrop( id: string ){
    return this.http.request( Requests['deleteDrop'], null, id )
      .pipe(
        tap(() => {
          this.drops = this.drops.filter( p => p.id != id )
          this.$drops.next(this.drops)
        })
      )
  }


    

  postDrop( data: Record<string, any> ){
    return this.http.request( Requests['postDrop'], data )
      .pipe(
        map((d: Drop) => {
          return { ...d, start_at: d.start_at*1000 }
        }),
        tap(d => {
          this.drops.unshift(d)
          this.$drops.next(this.drops)
        })
      )      
  }


  stopDrop( id: string ){
    return this.http.request( Requests['stopDrop'], null, id )
      .pipe(
        tap(() => {
          this.drops = this.drops.map( d => {
            if ( d.id !== id ) return d;
            return { ...d, status: 'stopped' }
          })
          this.$drops.next(this.drops)
        })
      )
  }
}
