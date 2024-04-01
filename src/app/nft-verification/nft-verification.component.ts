import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { HttpService } from '../tools/services/http.service';
import { NftVerificationRequests } from './common/consts/nft-verification.consts';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { spinnerName } from '../account/consts';
import { filter, finalize, map, shareReplay, take } from 'rxjs';
import { NftVerificationDTO } from './common/models/nft-verification.models';
import { ToolsService } from '../tools/services/tools.service';
import { PlansService } from '../plans/services/plans.service';
import { SelectorValue } from '../tools/interfaces/selector-values';
import { AccountService } from '../account/services/account.service';
import { environment } from 'src/environments/environment';

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
    collectionSymbol: new FormControl<string | undefined>(
      undefined,
      Validators.required
    ),
    attributesKeys: new FormGroup({
      licenseTypeKey: new FormControl('', Validators.required),
      renewalDateKey: new FormControl('', Validators.required),
      blockedKey: new FormControl<undefined | string>(undefined),
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

  constructor(
    private http: HttpService,
    private spinner: NgxSpinnerService,
    private tools: ToolsService,
    private cdr: ChangeDetectorRef,
    private account: AccountService
  ) {}

  ngOnInit(): void {
    this.spinner.show(spinnerName);

    this.http
      .request<NftVerificationDTO | null>(NftVerificationRequests.GET_DATA)
      .pipe(
        finalize(() => this.spinner.hide(spinnerName)),
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

  copyLink() {
    this.account.owner
      .pipe(
        take(1),
        filter(Boolean),
        map((d) => d.general.name.replace(' ', '-').toLowerCase())
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
      mintAddresses: this.form.value.mintAddresses!.split('\n'),
    };

    this.spinner.show(spinnerName);

    this.http
      .request(NftVerificationRequests.PUT_DATA, value)
      .pipe(finalize(() => this.spinner.hide(spinnerName)))
      .subscribe({
        next: () => this.tools.generateNotification('Saved', 'success'),
        error: () => {},
      });
  }
}
