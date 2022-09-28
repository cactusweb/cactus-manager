import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ToolsService } from 'src/app/tools/services/tools.service';

@Component({
  selector: 'app-router-loader',
  templateUrl: './router-loader.component.html',
  styleUrls: ['./router-loader.component.scss']
})
export class RouterLoaderComponent implements OnInit, OnDestroy {
  show: boolean = false;

  sub!: Subscription;

  constructor(
    private router: Router,
    private tools: ToolsService
  ) { 
    this.listenRouteLoading();
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe()
  }


  
  listenRouteLoading(){
    this.sub = this.router.events.subscribe(event => {
      if ( event instanceof NavigationStart ) this.show = true; else
      if ( this.show == false ) return; else
      if ( event instanceof NavigationEnd || event instanceof NavigationCancel || event instanceof NavigationError ) this.show = false;

      if ( event instanceof NavigationError ){
        this.tools.generateNotification( 'Failed to load page' )
      }
    });
  }

}
