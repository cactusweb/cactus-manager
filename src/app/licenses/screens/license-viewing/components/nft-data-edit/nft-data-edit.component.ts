import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BehaviorSubject, finalize, map } from 'rxjs';
import {
  License,
  LicenseNftDataDTO,
} from 'src/app/licenses/interfaces/license';
import { HttpService } from 'src/app/tools/services/http.service';
import { ToolsService } from 'src/app/tools/services/tools.service';
import { NFT_EDIT_METADATA_REQUEST } from './consts/nft-data-edit.consts';
import { LicensesService } from 'src/app/licenses/services/licenses.service';

type ToFormControls<T> = {
  [K in keyof T]: FormControl<T[K] | null>;
};
type NftDataForm = ToFormControls<LicenseNftDataDTO>;

@Component({
  selector: 'csm-nft-data-edit',
  templateUrl: './nft-data-edit.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NftDataEditComponent implements OnInit {
  readonly loading$ = new BehaviorSubject(false);

  readonly form = new FormGroup<NftDataForm>({
    quantity: new FormControl<number>(1, Validators.required),
    wallet: new FormControl('', Validators.required),
    mint_address: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
  });

  constructor(
    private tools: ToolsService,
    private dialogRef: MatDialogRef<NftDataEditComponent>,
    private licService: LicensesService,
    private http: HttpService,
    @Inject(MAT_DIALOG_DATA) private license: License
  ) {}

  ngOnInit(): void {
    this.form.patchValue(this.license.nft_data!);
  }

  onSubmit() {
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      return;
    }

    this.loading$.next(true);

    this.http
      .request<License>(
        NFT_EDIT_METADATA_REQUEST,
        this.form.value,
        this.license.id
      )
      .pipe(
        finalize(() => this.loading$.next(false)),
        map((d) => ({ ...d, expires_in: d.expires_in * 1000 }))
      )
      .subscribe({
        next: (lic) => {
          this.licService.editLicense(lic);
          this.tools.generateNotification('Successful edited', 'success');
          this.dialogRef.close(lic);
        },
        error: () => {},
      });
  }
}
