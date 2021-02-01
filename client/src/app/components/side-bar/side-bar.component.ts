import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent {
  @Output() changePageName = new EventEmitter<{}>();
  

  constructor(
    private auth: AuthService
  ) { }

  logout(){
    this.auth.logout();
  }

}
