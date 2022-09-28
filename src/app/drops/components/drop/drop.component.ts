import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize, take } from 'rxjs';
import { ToolsService } from 'src/app/tools/services/tools.service';
import { DropsSpinnerName } from '../../const';
import { Drop } from '../../interfaces/drop';
import { DropsService } from '../../services/drops.service';

@Component({
  selector: 'app-drop',
  templateUrl: './drop.component.html',
  styleUrls: ['./drop.component.scss']
})
export class DropComponent implements OnInit {
  @Input() drop!: Drop
  @Output() onDelete = new EventEmitter<string>();

  constructor(
    public tools: ToolsService,
    private dropsService: DropsService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
  }

  onAction(){
    if ( this.drop.status == 'stopped' ) return this.deleteDrop();
    this.stopDrop();
  }

  deleteDrop(){
    this.spinner.show(DropsSpinnerName)

    this.dropsService.deleteDrop( this.drop.id )
      .pipe(
        take(1),
        finalize(() => this.spinner.hide(DropsSpinnerName))
      )
      .subscribe({
        next: () => {},
        error: () => {},
        complete: () => this.onDelete.emit(this.drop.id)
      })
  }


  stopDrop(){
    this.spinner.show(DropsSpinnerName)

    this.dropsService.stopDrop(this.drop.id)
      .pipe(
        take(1),
        finalize(() => this.spinner.hide(DropsSpinnerName))
      )
      .subscribe({
        next: () => {},
        error: () => {},
        complete: () => this.drop.status = 'stopped'
      })
  }

}
