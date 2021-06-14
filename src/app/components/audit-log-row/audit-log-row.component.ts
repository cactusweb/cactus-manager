import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-audit-log-row',
  templateUrl: './audit-log-row.component.html',
  styleUrls: ['./audit-log-row.component.scss']
})
export class AuditLogRowComponent implements OnInit {
  @Input() log;

  
  constructor() { }

  ngOnInit(): void {
  }

}
