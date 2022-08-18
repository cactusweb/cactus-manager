import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { SingletonService } from 'src/app/services/singleton/singleton.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {
  @Output() changePageName = new EventEmitter<{}>();
  

  constructor(
    private auth: AuthService,
    public singleton: SingletonService,
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
      case 'drops': dataHead = { pageName: 'Drops' }; break;
      case 'profile': dataHead = { pageName: 'Profile' }; break;
      case 'licenses': dataHead = { pageName: 'Licenses' }; break;
      case 'referrals': dataHead = { pageName: 'Referrals' }; break;
      case 'settings': dataHead = { pageName: 'Settings' }; break;
      case 'audit': dataHead = { pageName: 'Audit logs' }; break;
      case 'dashboard': dataHead = { pageName: 'Dashboard' }; break;
      default: dataHead = { pageName: '404' }
    }

    return dataHead;
  }

}
