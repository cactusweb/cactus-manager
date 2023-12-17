import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject, take, takeUntil } from 'rxjs';
import { AccountService } from 'src/app/account/services/account.service';
import { SelectorValue } from 'src/app/tools/interfaces/selector-values';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnDestroy, OnInit {
  searchParam: string = '';
  @Output() onSearch = new EventEmitter<string>();
  @Output() onDataUpdate = new EventEmitter();
  @Output() onOpenLicenseForm = new EventEmitter();

  @Output()
  filterLicTypes = new EventEmitter<string[]>();

  @Output()
  filterDsRoles = new EventEmitter<string[]>();

  dsRoleOptions!: SelectorValue[];

  readonly licTypesControl = new FormControl([]);
  readonly rolesControl = new FormControl([]);

  readonly destroyed$ = new Subject<void>();

  constructor(private acc: AccountService) {}

  ngOnInit(): void {
    this.getDsRoles();
    this.subToFilterControls();
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  private subToFilterControls() {
    this.licTypesControl.valueChanges
      .pipe(takeUntil(this.destroyed$))
      .subscribe((types) => this.filterLicTypes.emit(types));

    this.rolesControl.valueChanges
      .pipe(takeUntil(this.destroyed$))
      .subscribe((roles) => this.filterDsRoles.emit(roles));
  }

  private getDsRoles() {
    this.acc.roles.pipe(takeUntil(this.destroyed$)).subscribe((roles) => {
      this.dsRoleOptions = roles.map((r) => {
        return { display: r.name, value: r.id };
      });
    });
  }
}
