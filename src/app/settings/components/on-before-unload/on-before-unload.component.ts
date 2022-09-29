import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-on-before-unload',
  templateUrl: './on-before-unload.component.html',
  styleUrls: ['./on-before-unload.component.scss']
})
export class OnBeforeUnloadComponent implements OnInit {
  @Output() onClose = new EventEmitter();
  @Output('onEmitStatus') status = new EventEmitter<boolean>()


  constructor() { }

  ngOnInit(): void {
  }

  
  @HostListener('document:keydown.escape', ['$event'])
  onEscape(e: KeyboardEvent){
    this.close(true)
  }

  close( status: boolean ){
    this.status.emit(status);
    this.onClose.emit();
  }

}
