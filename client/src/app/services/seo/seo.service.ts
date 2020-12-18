import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  constructor(
    private meta: Meta,
    private title: Title,
  ) { }


  changeIndex(content: string){
    this.meta.updateTag({ name: 'robots', content: content });
  }

  changeUrl(url: string){
    url = 'https://manager.cactusweb.io' + url;
    this.meta.updateTag({property: 'og:url', content: url});
    this.meta.updateTag({name: 'url', content: url});
  }

  changeTitle(title){
    this.title.setTitle(title);
  }

}
