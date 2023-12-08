import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { ToolsService } from 'src/app/tools/services/tools.service';
import { TxInfo } from './tx-info';
import { NETWORKS_SCANS } from './transactions.enum';

@Component({
  selector: 'app-transaction-view',
  templateUrl: './transaction-view.component.html',
  styleUrls: ['./transaction-view.component.scss'],
})
export class TransactionViewComponent implements OnInit {
  @Input() data!: TxInfo;

  txLink: string = '';

  @Output() onClose = new EventEmitter();

  constructor(public tools: ToolsService) {}

  ngOnInit(): void {
    this.txLink =
      NETWORKS_SCANS[
        this.data.type.network.toUpperCase() as keyof typeof NETWORKS_SCANS
      ] + this.data.tx;
  }

  @HostListener('document:keydown.escape', ['$event'])
  onEscape(e: KeyboardEvent) {
    this.onClose.emit();
  }
}
