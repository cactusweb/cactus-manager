import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';

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

  @Input() value: any;
  @Input() checked: boolean;

  @Input() isRow: boolean = false;

  @Output() newValue = new EventEmitter<any>();
  @Output() reset = new EventEmitter();

  constructor() { 
  }

  


  onNewValue(){
    this.newValue.emit( this.value );
  }

  onAddFile(event){
    this.newValue.emit(event)
  }

  onReset(){
    this.reset.emit();
  }
}
