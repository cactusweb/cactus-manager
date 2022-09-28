import { Injectable } from '@angular/core';
import { BehaviorSubject, share } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FailedLoadService {
  private $viewing = new BehaviorSubject<boolean>(false)
  public viewing = this.$viewing.asObservable();
  

  constructor() {
  }

  public show(){
    this.$viewing.next(true);
    return this.$viewing.asObservable().pipe(share());
  }

  public hide(){
    this.$viewing.next(false);
  }

  
}
