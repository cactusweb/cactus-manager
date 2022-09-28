import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Request } from '../../interfaces/request';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss']
})
export class RequestComponent implements OnInit, OnChanges {
  @Input() req!: Request
  @Input() accId!: string;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ( changes['accId'] && this.accId && this.req )
      this.req.body = this.req.body.replace(':param', this.accId)
  }

}
