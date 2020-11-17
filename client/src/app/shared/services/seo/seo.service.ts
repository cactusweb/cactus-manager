import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  constructor(
    private meta: Meta,
    private title: Title,
    private activatedRoute: ActivatedRoute
  ) { }


  changeIndex(content: string){
    this.meta.updateTag({ name: 'robots', content: content });
  }

  changeUrl(url: string){
    url = 'https://cactus-manager.ru' + url;
    this.meta.updateTag({property: 'og:url', content: url});
    this.meta.updateTag({name: 'url', content: url});
  }

  changeTitle(title){
    this.title.setTitle(title);
  }

}
