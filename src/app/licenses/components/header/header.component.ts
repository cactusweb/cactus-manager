import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  searchParam: string = '';
  @Output() onSearch = new EventEmitter<string>();
  @Output() onFilter = new EventEmitter<string[]>();
  @Output() onDataUpdate = new EventEmitter();
  @Output() onOpenLicenseForm = new EventEmitter();

  filterType: { lifetime: boolean, renewal: boolean, trial: boolean, trialRenewal: boolean } = {
    lifetime: false,
    renewal: false,
    trial: false,
    trialRenewal: false,
  };
  

  constructor() { }

  ngOnInit(): void {
  }

  onFilterChange(){
    let filter: string[] = [];

    if ( this.filterType.lifetime ) filter.push('lifetime')
    if ( this.filterType.renewal ) filter.push('renewal')
    if ( this.filterType.trial ) filter.push('trial')
    if ( this.filterType.trialRenewal ) filter.push('trial-renewal')

    this.onFilter.emit(filter)
  }

}
