import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { RyodanMetamask } from 'src/app/ryodan-customization/common/interfaces/ryodan-customization.interfaces';
import { RyodanHttpService } from 'src/app/ryodan-customization/common/services/ryodan-http.service';
import { ToolsService } from 'src/app/tools/services/tools.service';

@Component({
  selector: 'ryodan-wallet-row',
  templateUrl: './wallet-row.component.html',
  styleUrls: ['./wallet-row.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RyodanWalletRowComponent {
  @Input()
  wallet!: RyodanMetamask;

  @Input()
  index!: number;

  @Output()
  delete = new EventEmitter<void>();

  constructor(private http: RyodanHttpService, private tools: ToolsService) {}

  get phraseDisplay() {
    const words = this.wallet.phrase.split(' ');
    return `${words.shift()} ${words.shift()} ... ${words.pop()}`;
  }

  copyPhrase() {
    this.tools.copy(this.wallet.phrase);
  }
}
