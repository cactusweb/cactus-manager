import { AfterContentInit, Component, ElementRef, EventEmitter, forwardRef, HostListener, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MethodControl } from '../../interfaces/method-control';

@Component({
  selector: 'address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.scss']
})
export class AddressFormComponent implements OnInit, AfterContentInit {
  @Input() method!: MethodControl
  @Input() address: string = ''

  @Output() onSave = new EventEmitter<string>()
  @Output() onClose = new EventEmitter()

  @ViewChild('input') input!: ElementRef;

  constructor() {}

  ngOnInit(): void {
  }

  ngAfterContentInit(): void {
    setTimeout(() => this.input?.nativeElement?.focus(), 1);
  }

  
  @HostListener('document:keydown.escape', ['$event'])
  onEscape(e: KeyboardEvent){
    this.onClose.emit();
  }

}
