import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { ToolsService } from 'src/app/tools/services/tools.service';
import { networkScanUrl } from './const';
import { TxInfo } from './tx-info';

@Component({
  selector: 'app-transaction-view',
  templateUrl: './transaction-view.component.html',
  styleUrls: ['./transaction-view.component.scss']
})
export class TransactionViewComponent implements OnInit {
  @Input() data!: TxInfo

  txLink: string = '';

  @Output() onClose = new EventEmitter()

  constructor(
    public tools: ToolsService
  ) { }

  ngOnInit(): void {
    this.txLink = networkScanUrl[this.data.type.network.toLowerCase()]+this.data.tx;
  }
  
  
  @HostListener('document:keydown.escape', ['$event'])
  onEscape(e: KeyboardEvent){
    this.onClose.emit();
  }

}
