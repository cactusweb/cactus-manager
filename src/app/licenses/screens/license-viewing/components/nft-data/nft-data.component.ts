import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { LicenseNftDataDTO } from 'src/app/licenses/interfaces/license';
import { ToolsService } from 'src/app/tools/services/tools.service';

@Component({
  selector: 'csm-nft-data',
  templateUrl: './nft-data.component.html',
  styleUrls: ['./nft-data.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NftDataComponent {
  @Input()
  nftData!: LicenseNftDataDTO;

  constructor(private tools: ToolsService) {}

  copy(val: string) {
    this.tools.copy(val);
  }

  getLastFour(val: string): string {
    const length = val.length;
    return val.substring(length - 4, length);
  }
}
