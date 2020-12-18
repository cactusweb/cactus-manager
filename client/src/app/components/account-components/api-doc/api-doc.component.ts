import { AfterViewInit, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-api-doc',
  templateUrl: './api-doc.component.html',
  styleUrls: ['./api-doc.component.css']
})
export class ApiDocComponent implements AfterViewInit {

  
  ngAfterViewInit(){
    console.log('kk')
  }

}
