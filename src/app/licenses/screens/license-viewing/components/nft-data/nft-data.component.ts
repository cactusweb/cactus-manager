import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import {
  License,
  LicenseNftDataDTO,
} from 'src/app/licenses/interfaces/license';
import { HttpService } from 'src/app/tools/services/http.service';
import { ToolsService } from 'src/app/tools/services/tools.service';
import {
  NFT_REFRESH_METADATA_REQUEST,
  NftRefreshMetadataDTO,
  NftRefreshMetadataReasons,
  NftRefreshMetadataStatuses,
} from './models/nft-data.requests';
import { BehaviorSubject, finalize, take } from 'rxjs';
import { LicensesService } from 'src/app/licenses/services/licenses.service';
import { MatDialog } from '@angular/material/dialog';
import { NftDataEditComponent } from '../nft-data-edit/nft-data-edit.component';

@Component({
  selector: 'csm-nft-data',
  templateUrl: './nft-data.component.html',
  styleUrls: ['./nft-data.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NftDataComponent {
  @Input()
  license!: License;

  @Output()
  readonly closeModal = new EventEmitter<void>();

  readonly loading$ = new BehaviorSubject(false);

  constructor(
    private tools: ToolsService,
    private http: HttpService,
    private licService: LicensesService,
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef
  ) {}

  get nftData() {
    return this.license.nft_data;
  }

  copy(val: string) {
    this.tools.copy(val);
  }

  getLastFour(val: string): string {
    const length = val.length;
    return val.substring(length - 4, length);
  }

  onRefreshMeta() {
    this.loading$.next(true);
    this.http
      .request<NftRefreshMetadataDTO>(
        NFT_REFRESH_METADATA_REQUEST,
        null,
        this.license.id
      )
      .pipe(finalize(() => this.loading$.next(false)))
      .subscribe({
        next: (res) => this.handleRefreshing(res),
        error: () => {},
      });
  }

  onEditMeta() {
    const dialogRef = this.dialog.open(NftDataEditComponent, {
      maxWidth: '600px',
      width: '100%',
      autoFocus: false,
      restoreFocus: false,
      data: this.license,
    });

    dialogRef
      .beforeClosed()
      .pipe(take(1))
      .subscribe((res: License | undefined) => {
        if (!res) {
          return;
        }
        this.license = res;
        this.cdr.markForCheck();
      });
  }

  private handleRefreshing(data: NftRefreshMetadataDTO) {
    if (data.status === NftRefreshMetadataStatuses.UPDATED) {
      this.tools.generateNotification(
        'License updated successfully.',
        'primary'
      );
      this.licService.editLicense(data.license);
      return;
    }

    const deletedMsg =
      data.reason === NftRefreshMetadataReasons.BLOCKED
        ? 'NFT blocked.'
        : 'NFT frozen.';

    this.tools.generateNotification(
      `${deletedMsg} License deleted.`,
      'primary'
    );
    this.closeModal.emit();
    this.licService.onDeleteLicense(this.license.id);
  }
}
