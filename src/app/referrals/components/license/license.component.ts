import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { finalize, take } from 'rxjs';
import { License } from 'src/app/licenses/interfaces/license';
import { LicensesService } from 'src/app/licenses/services/licenses.service';
import { ToolsService } from 'src/app/tools/services/tools.service';

@Component({
  selector: 'app-license',
  templateUrl: './license.component.html',
  styleUrls: ['./license.component.scss']
})
export class LicenseComponent implements OnInit {
  @Input() license!: License
  loading: boolean = false;

  @Output() onView = new EventEmitter<string>();
  @Output() onReset = new EventEmitter<string>()

  constructor(
    public tools: ToolsService,
    private lic: LicensesService
  ) { }

  ngOnInit(): void {
  }

  
  getLastFour(): string{
    return this.license.key.substring(15,19)
  }

  resetPoints(){
    this.loading = true;

    this.lic.resetPoints(this.license.id)
      .pipe(
        take(1),
        finalize(() => this.loading = false)
      )
      .subscribe({
        next: () => {},
        error: () => {},
        complete: () => this.onReset.emit(this.license.id)
      })
  }

}
