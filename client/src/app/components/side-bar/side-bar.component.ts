import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {
  @Output() changePageName = new EventEmitter<{}>();
  

  constructor(
    private auth: AuthService,
    private router: ActivatedRoute
  ) { }

  logout(){
    this.auth.logout();
  }

  ngOnInit(){
    this.changePageName.emit( this.getCurrentPageName() );
  }


  getCurrentPageName(){
    let paths = window.location.href.split('/');
    let lastPath = paths[paths.length-1];
    let dataHead = {};

    switch (lastPath){
      case 'api': dataHead = { pageName: 'API', dataShow: true }; break;
      default: dataHead = { pageName: 'Licenses', dataShow: false }; break;
    }

    return dataHead;
  }

}
