import { Component, Input, OnInit } from '@angular/core';
import { ToolsService } from 'src/app/tools/services/tools.service';
import { Log } from '../../interfaces/log';

@Component({
  selector: 'app-log-row',
  templateUrl: './log-row.component.html',
  styleUrls: ['./log-row.component.scss']
})
export class LogRowComponent implements OnInit {
  @Input() log!: Log

  constructor(
    public tools: ToolsService
  ) { }

  ngOnInit(): void {
  }


  
  getLastFour(): string{
    return this.log.key.substring(15,19)
  }
}
