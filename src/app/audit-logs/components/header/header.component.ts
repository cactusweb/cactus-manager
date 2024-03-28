import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { logStatuses } from '../../const';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  form!: UntypedFormGroup
  @Output() onFIlterChange = new EventEmitter<{ filter: string[], search: string }>()

  sub!: Subscription

  logStatuses = logStatuses

  constructor() { }

  ngOnInit(): void {
    this.generateForm();

    this.sub = this.form.valueChanges.subscribe(res => this.onFIlterChange.emit(res))
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  generateForm(){
    this.form = new UntypedFormGroup({
      filter: new UntypedFormControl([]),
      search: new UntypedFormControl('')
    })
  }

}
