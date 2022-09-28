import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { logStatuses } from '../../const';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  form!: FormGroup
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
    this.form = new FormGroup({
      filter: new FormControl([]),
      search: new FormControl('')
    })
  }

}
