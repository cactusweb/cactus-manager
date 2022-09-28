import { Component, Input, OnInit } from '@angular/core';
import { ToolsService } from 'src/app/tools/services/tools.service';

@Component({
  selector: 'app-license-key',
  templateUrl: './license-key.component.html',
  styleUrls: ['./license-key.component.scss']
})
export class LicenseKeyComponent implements OnInit {
  @Input() key!: string 

  constructor(
    public tools: ToolsService
  ) { }

  ngOnInit(): void {
  }

  
  getLastFour(): string{
    return this.key.substring(15,19)
  }

}
