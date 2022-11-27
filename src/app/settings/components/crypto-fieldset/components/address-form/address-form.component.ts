import { Component, EventEmitter, forwardRef, HostListener, Input, OnInit, Output } from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MethodControl } from '../../interfaces/method-control';

@Component({
  selector: 'address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.scss']
})
export class AddressFormComponent implements OnInit {
  @Input() method!: MethodControl
  @Input() address: string = ''

  @Output() onSave = new EventEmitter<string>()
  @Output() onClose = new EventEmitter()

  constructor() {}

  ngOnInit(): void {
  }

  
  @HostListener('document:keydown.escape', ['$event'])
  onEscape(e: KeyboardEvent){
    this.onClose.emit();
  }

}
