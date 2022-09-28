import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map, mergeMap, Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  title: string = 'Licenses';

  sub!: Subscription

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.subOnPageNameChanges();
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe()
  }

  subOnPageNameChanges(){
    this.sub = this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => this.activatedRoute),
        map((route) => {
          while (route.firstChild) route = route.firstChild;
          return route;
        }),
        filter((route) => route.outlet === 'primary'),
        mergeMap((route) => route.data)
      )
      .subscribe((e) => {
        if ( e['pageName'] ) 
          this.title = e['pageName']
      }); 
  }

}
