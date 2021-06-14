import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  constructor(
    private meta: Meta,
    private title: Title,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }


  autoUpdateTags(){

    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map(() => this.activatedRoute),
      map((route) => {
        while (route.firstChild) route = route.firstChild;
        return route;
      }),
      filter((route) => route.outlet === 'primary'),
      mergeMap((route) => route.data)
     )
     .subscribe((event) => {
       this.changeUrl( this.router.url );
       this.changeTitle( event.title );
       this.changeDescription( event.descript || '' )
     }); 
  }


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
    this.meta.updateTag( { name: 'title', content: title } )
    this.meta.updateTag( { property: 'og:title', content: title } )
  }

  changeDescription( descript ){
    if ( !descript ) return;
    this.meta.updateTag( { name: 'description', content: descript } )
    this.meta.updateTag( { property: 'og:description', content: descript } )
  }

}
