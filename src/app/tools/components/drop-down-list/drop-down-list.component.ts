import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SelectorValue } from '../../interfaces/selector-values';

@Component({
  selector: 'drop-down-list',
  templateUrl: './drop-down-list.component.html',
  styleUrls: ['./drop-down-list.component.scss'],
  host : {
      '[style.bottom]' : "show ? '-8px' : '0px'",
      '[style.transform]' : "show ? 'translate(0, 100%)' : 'translate(0, 100%) scale(1, 0)'"
  }
})
export class DropDownListComponent implements OnInit {
  @Input() show: boolean = false;

  @Input('opt') options: SelectorValue[] = [];

  @Input() value: string|number|null = null;

  @Output() onChangeValue = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }


  onItemClick(newValue: any){
    this.value = this.value == newValue ? null : newValue;
    this.onChangeValue.emit(this.value)
  }

}
