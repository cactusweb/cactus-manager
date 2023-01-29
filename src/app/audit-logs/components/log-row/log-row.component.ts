import { AfterContentInit, AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ToolsService } from 'src/app/tools/services/tools.service';
import { Log } from '../../interfaces/log';
import { TransactionViewService } from '../transaction-view/transaction-view.service';
import { TxInfo } from '../transaction-view/tx-info';

@Component({
  selector: 'app-log-row',
  templateUrl: './log-row.component.html',
  styleUrls: ['./log-row.component.scss']
})
export class LogRowComponent implements OnChanges {
  @Input() log!: Log

  txInfo: TxInfo|undefined;

  constructor(
    public tools: ToolsService,
    private popup: TransactionViewService,
    private eRef: ElementRef
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.getTxInfo();
  }

  getTxInfo(){
    try{
      let data = JSON.parse(this.log.details) as TxInfo;
      if ( !data.tx ) throw '';
      this.txInfo = data;
    }
    catch(e){
      this.txInfo = undefined
    }
  }

  
  getLastFour(): string{
    return this.log.key.substring(15,19)
  }

  showTxInfo(){
    this.popup.changePopupState(this.txInfo)
  }
}
