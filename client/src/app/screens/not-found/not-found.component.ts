import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SeoService } from 'src/app/services/seo/seo.service';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {

  redirectTo: string = '/';
  showLogo: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    ) { 
    let data: any = this.activatedRoute.data.pipe();
    data = data._value;
    this.showLogo = data.showLogo;
    this.redirectTo = data.redirectTo;
  }

  ngOnInit(): void {
    console.log( this.showLogo, this.redirectTo )
  }

}
