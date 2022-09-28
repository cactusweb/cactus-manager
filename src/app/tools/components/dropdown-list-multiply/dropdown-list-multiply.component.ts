import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SelectorValue } from '../../interfaces/selector-values';

@Component({
  selector: 'app-dropdown-list-multiply',
  templateUrl: './dropdown-list-multiply.component.html',
  styleUrls: ['./dropdown-list-multiply.component.scss'],
  host : {
      '[style.bottom]' : "show ? '-8px' : '0px'",
      '[style.transform]' : "show ? 'translate(0, 100%)' : 'translate(0, 100%) scale(1, 0)'"
  }
})
export class DropdownListMultiplyComponent implements OnInit {
  @Input() show: boolean = false;

  @Input('opt') options: SelectorValue[] = [];

  @Input() value: any[] = [];

  @Output() onChangeValue = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }


  onItemClick(newValue: any){
    let indexOf = this.value.indexOf(newValue)
    indexOf >= 0 ? this.value.splice(indexOf,1) : this.value.push(newValue)
    this.onChangeValue.emit(this.value)
  }

}
