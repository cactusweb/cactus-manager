import { Injectable } from '@angular/core';
import { BehaviorSubject, distinctUntilChanged, share } from 'rxjs';
import { RyodanHttpService } from 'src/app/ryodan-customization/common/services/ryodan-http.service';

@Injectable()
export class RyodanMmHeaderService {
  private readonly _remainingWalletCount$ = new BehaviorSubject<number | null>(
    null
  );

  constructor(private http: RyodanHttpService) {}

  get remainingWalletCount$() {
    return this._remainingWalletCount$
      .asObservable()
      .pipe(share(), distinctUntilChanged());
  }

  getRemainingWalletCount() {
    this.http.getRemainingMetamasksCount().subscribe({
      next: (d: number) => this._remainingWalletCount$.next(d),
      error: () => {},
    });
  }

  changeRemainingWalletCount(delta: number) {
    this._remainingWalletCount$.next(
      this._remainingWalletCount$.value! - delta
    );
  }
}
