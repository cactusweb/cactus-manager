import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SeoService } from 'src/app/shared/services/seo/seo.service';

@Component({
  selector: 'app-owner-api',
  templateUrl: './owner-api.component.html',
  styleUrls: ['./owner-api.component.css']
})
export class OwnerApiComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private seo: SeoService,
  ) { 
    let data: any = this.activatedRoute.data.pipe();
    data = data._value;
    this.seo.changeTitle(data.title);
  }

  ngOnInit(): void {
  }

}
