import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-profile-input',
  templateUrl: './profile-input.component.html',
  styleUrls: ['./profile-input.component.scss']
})
export class ProfileInputComponent {
  @Input() label: string = '';
  @Input() placeholder = '';
  @Input() type: string = 'input';
  @Input() radios: [any];
  
  @Input() isDisabled: boolean = false;

  @Input() value: string = '';

  @Output() newValue = new EventEmitter<string>();

  constructor() { }


  onNewValue(){
    this.newValue.emit( this.value );
  }

}
