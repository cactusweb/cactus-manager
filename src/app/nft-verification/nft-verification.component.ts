import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  OnInit,
  inject,
} from '@angular/core';
import { HttpService } from '../tools/services/http.service';
import { NftVerificationRequests } from './common/consts/nft-verification.consts';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ACCOUNT_SPINNER_NAME } from '../account/consts';
import { filter, finalize, map, take } from 'rxjs';
import { NftVerificationDTO } from './common/models/nft-verification.models';
import { ToolsService } from '../tools/services/tools.service';
import { PlansService } from '../plans/services/plans.service';
import { SelectorValue } from '../tools/interfaces/selector-values';
import { AccountService } from '../account/services/account.service';
import { environment } from 'src/environments/environment';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatDialog } from '@angular/material/dialog';
import { WebhookFormComponent } from './webhook-form/webhook-form.component';

@Component({
  selector: 'cm-nft-verification',
  templateUrl: './nft-verification.component.html',
  styleUrls: ['./nft-verification.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NftVerificationComponent implements OnInit {
  readonly form = new FormGroup({
    enabled: new FormControl(false, Validators.required),
    mintAddresses: new FormControl('', Validators.required),
    rn_plan: new FormControl('', Validators.required),
    lt_plan: new FormControl(''),
    collectionSymbol: new FormControl<string | undefined>(undefined),
    attributesKeys: new FormGroup({
      licenseTypeKey: new FormControl('', Validators.required),
      renewalDateKey: new FormControl('', Validators.required),
      blockedKey: new FormControl<undefined | string>(undefined),
    }),
    frozenAction: new FormGroup({
      enabled: new FormControl(false),
      key: new FormControl({ value: '', disabled: true }, Validators.required),
      role: new FormControl({ value: '', disabled: true }, Validators.required),
    }),
  });

  private readonly plans$ = inject(PlansService).getPlans();
  readonly guideUrl = environment.guideURL + '/nft-verification';

  readonly ltPlans$ = this.plans$.pipe(
    map((plans) =>
      plans
        .filter((p) => p.type === 'lifetime')
        .map(
          (plan) => ({ display: plan.name, value: plan.id } as SelectorValue)
        )
    )
  );

  readonly rnPlans$ = this.plans$.pipe(
    map((plans) =>
      plans
        .filter((p) => p.type === 'renewal')
        .map(
          (plan) => ({ display: plan.name, value: plan.id } as SelectorValue)
        )
    )
  );

  readonly roles$ = this.account.roles.pipe(
    map((roles) => roles.map((r) => ({ display: r.name, value: r.id })))
  );

  readonly #destroyRef = inject(DestroyRef);

  constructor(
    private http: HttpService,
    private spinner: NgxSpinnerService,
    private tools: ToolsService,
    private cdr: ChangeDetectorRef,
    private account: AccountService,
    private matDialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.spinner.show(ACCOUNT_SPINNER_NAME);

    this.listenFrozenForm();

    this.http
      .request<NftVerificationDTO | null>(NftVerificationRequests.GET_DATA)
      .pipe(
        finalize(() => this.spinner.hide(ACCOUNT_SPINNER_NAME)),
        filter(Boolean),
        map((data) => ({
          ...data,
          mintAddresses: data.mintAddresses.join('\n'),
        }))
      )
      .subscribe((res) => {
        this.form.patchValue(res);
        this.cdr.markForCheck();
      });
  }

  openWhForm() {
    this.matDialog.open(WebhookFormComponent, {
      width: '100%',
      maxWidth: '450px',
    });
  }

  copyLink() {
    this.account.owner
      .pipe(
        take(1),
        filter(Boolean),
        map((d) => d.general.name.replaceAll(' ', '-').toLowerCase())
      )
      .subscribe((res) =>
        this.tools.copy(
          `https://dashboard.cactusweb.io/${res}/nft-verification`
        )
      );
  }

  onSave() {
    this.form.markAllAsTouched();

    if (this.form.invalid) {
      return;
    }

    const value = {
      ...this.form.value,
      mintAddresses: this.modifyMintAddresses(this.form.value.mintAddresses!),
    };

    this.spinner.show(ACCOUNT_SPINNER_NAME);

    this.http
      .request<NftVerificationDTO>(NftVerificationRequests.PUT_DATA, value)
      .pipe(
        finalize(() => this.spinner.hide(ACCOUNT_SPINNER_NAME)),
        map((data) => ({
          ...data,
          mintAddresses: data.mintAddresses.join('\n'),
        }))
      )
      .subscribe({
        next: (res) => {
          this.tools.generateNotification('Saved', 'success');
          this.form.patchValue(res);
        },
        error: () => {},
      });
  }

  private listenFrozenForm() {
    const frozenForm = this.form.get('frozenAction')!;

    frozenForm
      .get('enabled')!
      .valueChanges.pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe((res) => {
        const action = res ? 'enable' : 'disable';

        frozenForm.get('key')![action]();
        frozenForm.get('role')![action]();
      });
  }

  private modifyMintAddresses(mintAddresses: string) {
    try {
      return JSON.parse(mintAddresses);
    } catch {
      return mintAddresses.split('\n').map((str) => str.trim());
    }
  }
}
