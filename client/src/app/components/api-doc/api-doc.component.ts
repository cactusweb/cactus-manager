import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SeoService } from 'src/app/services/seo/seo.service';

@Component({
  selector: 'app-api-doc',
  templateUrl: './api-doc.component.html',
  styleUrls: ['./api-doc.component.scss']
})
export class ApiDocComponent implements AfterViewInit {
  id: string = localStorage.getItem('ownerId');
  
  constructor(
    private activatedRoute: ActivatedRoute,
    private seo: SeoService
  ) { 
    let data: any = this.activatedRoute.data.pipe();
    data = data._value;
    this.seo.changeTitle(data.title);
  }
  
  ngAfterViewInit(){
    
  }

}
