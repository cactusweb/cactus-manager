import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs/operators';
import { SeoService } from './services/seo/seo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'CactusManager';
  subscribtion;
  url: string = '';

  constructor(
    private seo: SeoService
  ){
    this.seo.autoUpdateTags();
  }
}
