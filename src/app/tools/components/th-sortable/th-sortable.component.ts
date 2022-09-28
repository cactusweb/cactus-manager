import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

enum SortType{
  'null' = 0,
  'ascend' = 1,
  'discend' = 2
}

@Component({
  selector: 'th-sortable',
  templateUrl: './th-sortable.component.html',
  styleUrls: ['./th-sortable.component.scss']
})
export class ThSortableComponent implements OnInit {
  @Input() label: string = 'Label';

  @Input() sortType: 0|1|2 = 0;

  @Output() onChangeSort = new EventEmitter<'ascend' | 'discend' | null>()

  constructor() { }

  ngOnInit(): void {
  }


  onChangeSortType(){
    this.sortType++;

    if ( this.sortType > 2 ) this.sortType = 0;
    
    let sortType = SortType[this.sortType]

    // @ts-ignore
    this.onChangeSort.emit(sortType == 'null' ? null : sortType)
  }

}
