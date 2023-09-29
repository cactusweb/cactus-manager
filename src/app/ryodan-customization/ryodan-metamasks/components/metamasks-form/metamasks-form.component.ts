import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RyodanHttpService } from 'src/app/ryodan-customization/common/services/ryodan-http.service';
import { RyodanMmHeaderService } from '../header/header.service';
import { BehaviorSubject, finalize, map, tap } from 'rxjs';
import { ToolsService } from 'src/app/tools/services/tools.service';

@Component({
  selector: 'ryodan-mm-form',
  templateUrl: './metamasks-form.component.html',
  styleUrls: ['./metamasks-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RyodanMetamasksFormComponent {
  @Output()
  close = new EventEmitter<void>();

  readonly form = new FormGroup({
    wallets: new FormControl('', Validators.required),
  });

  readonly loading$ = new BehaviorSubject(false);

  constructor(
    private http: RyodanHttpService,
    private header: RyodanMmHeaderService,
    private tools: ToolsService
  ) {}

  onSubmit() {
    this.form.markAsTouched();

    if (this.form.invalid) return;

    this.loading$.next(true);
    this.http
      .postMetamaskWallets(this.form.get('wallets')!.value.split('\n'))
      .pipe(
        tap((d) => this.header.changeRemainingWalletCount(d.length)),
        finalize(() => this.loading$.next(false))
      )
      .subscribe({
        next: () => {
          this.tools.generateNotification('Successfull posted', 'success'),
            this.close.emit();
        },
        error: () => {},
      });
  }
}
