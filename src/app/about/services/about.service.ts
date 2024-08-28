import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import {
  BehaviorSubject,
  filter,
  finalize,
  map,
  Observable,
  switchMap,
  take,
  tap,
} from 'rxjs';
import { AboutDTO } from '../models/about.models';
import { ACCOUNT_SPINNER_NAME } from 'src/app/account/consts';
import { HttpService } from 'src/app/tools/services/http.service';
import { AboutRequests } from '../consts/about.requests';
import { ToolsService } from 'src/app/tools/services/tools.service';
import { CommonRequests } from 'src/app/common/consts/requests.consts';
import { AccountService } from 'src/app/account/services/account.service';
import {
  FileDropzoneAcceptedTypes,
  FileDropzoneAcceptedTypesNamesMap,
} from 'src/app/common/components/file-dropzone/models/file-dropzone.models';

@Injectable({
  providedIn: 'root',
})
export class AboutService {
  readonly about$;
  readonly #about$ = new BehaviorSubject<AboutDTO | null>(null);

  constructor(
    private spinnerService: NgxSpinnerService,
    private http: HttpService,
    private tools: ToolsService,
    private accService: AccountService
  ) {
    this.about$ = this.#about$
      .asObservable()
      .pipe(filter(Boolean)) as Observable<AboutDTO>;
  }

  fetchData() {
    const isFetched = Boolean(this.#about$.value);

    if (!isFetched) {
      this.showSpinner();
    }

    this.http
      .request<AboutDTO>(AboutRequests.GET)
      .pipe(finalize(() => (isFetched ? null : this.hideSpinner())))
      .subscribe({
        next: (res) => this.#about$.next(res),
        error: () => {},
      });
  }

  putData(data: AboutDTO) {
    this.showSpinner();

    this.http
      .request<AboutDTO>(AboutRequests.PUT, data)
      .pipe(finalize(() => this.hideSpinner()))
      .subscribe({
        next: (res) => this.#about$.next(res),
        error: () => {},
      });
  }

  postBanner(file: File) {
    const formData = new FormData();
    this.showSpinner();

    const fileExt = FileDropzoneAcceptedTypesNamesMap.get(
      file.type as FileDropzoneAcceptedTypes
    );

    return this.accService.owner.pipe(
      take(1),
      map((res) =>
        res ? `${res?.general.name}_${res?.id}-banner.${fileExt}` : file.type
      ),
      tap((fileName) => formData.append('image', file, fileName)),
      switchMap(() =>
        this.http.request<{ url: string }>(CommonRequests.POST_FILE, formData)
      ),
      tap(() => this.tools.generateNotification('Uploaded', 'success')),
      finalize(() => this.hideSpinner())
    );
  }

  deleteBanner(url: string) {
    this.showSpinner();
    return this.http
      .request<void>(CommonRequests.DELETE_FILE, { url })
      .pipe(finalize(() => this.hideSpinner()));
  }

  private hideSpinner() {
    this.spinnerService.hide(ACCOUNT_SPINNER_NAME);
  }

  private showSpinner() {
    this.spinnerService.show(ACCOUNT_SPINNER_NAME);
  }
}
