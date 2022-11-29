import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { TxInfo } from './tx-info';

@Injectable()
export class TransactionViewService {
  private popup = new Subject<TxInfo|undefined>()

  constructor() { }

  getPopup(){
    return this.popup.asObservable();
  }

  changePopupState( txInfo: TxInfo|undefined ){
    this.popup.next(txInfo)
  }
}
