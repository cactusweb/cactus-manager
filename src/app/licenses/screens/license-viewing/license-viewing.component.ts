import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { AccountService } from 'src/app/account/services/account.service';
import { License } from '../../interfaces/license';
import { take } from 'rxjs';
import { ToolsService } from 'src/app/tools/services/tools.service';

@Component({
  selector: 'app-license-viewing',
  templateUrl: './license-viewing.component.html',
  styleUrls: ['./license-viewing.component.scss']
})
export class LicenseViewingComponent implements OnInit {
  @Input() license!: License;

  @Output() onClose = new EventEmitter()

  loading: boolean = false;

  constructor(
    public tools: ToolsService
  ) { }

  ngOnInit(): void {
  }

  @HostListener('document:keydown.escape', ['$event'])
  onEscape(e: KeyboardEvent){
    this.onClose.emit();
  }


  resetPoints(){
    this.loading = true;

    this.loading = false;
  }


  getExpDate(){
    return this.license.payment.exp_date.slice(0,2) + '/' + this.license.payment.exp_date.slice(2,5)
  }

  getLastFour(): string{
    return this.license.key.substring(15,19)
  }
}
