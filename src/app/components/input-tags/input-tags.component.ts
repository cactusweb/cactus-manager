import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-input-tags',
  templateUrl: './input-tags.component.html',
  styleUrls: ['./input-tags.component.scss']
})
export class InputTagsComponent implements OnInit {
  placeholder: string = 'Press “enter” after each number';
  @Input() values: string[] = [];
  @Input() label: string = '';

  @Output() onChange = new EventEmitter<string[]>();

  input: string = '';

  constructor() { }

  ngOnInit(): void {
  }

  focusInp( e: any ){
    if ( e.target.classList.contains('profile-inp') )
      document.getElementById(this.label.split(' ').join('')).focus();
  }

  onAdd(){
    let value = this.input.trim();
    if ( value ){
      this.values.push( this.input )
    }
    this.onChange.emit(this.values)
    this.input = '';
  }

  deleteValue( i: number ){
    this.values.splice(i, 1)
    this.onChange.emit(this.values);
  }

}
