import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-profile-input',
  templateUrl: './profile-input.component.html',
  styleUrls: ['./profile-input.component.scss']
})
export class ProfileInputComponent implements OnChanges {
  @Input() label: string = '';
  @Input() placeholder = '';
  @Input() type: string = 'input';
  @Input() radios: [any];
  
  @Input() isDisabled: boolean = false;

  @Input() value: any;
  @Input() checked: boolean;

  @Output() newValue = new EventEmitter<any>();

  constructor() { 
  }

  
  ngOnChanges(){
    console.log(typeof this.value)
  }


  onNewValue(){
    this.newValue.emit( this.value );
  }

}
