import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  selector: 'app-owner-side-bar',
  templateUrl: './owner-side-bar.component.html',
  styleUrls: ['./owner-side-bar.component.css']
})
export class OwnerSideBarComponent implements OnInit {

  constructor(
    private auth: AuthService
  ) { }

  ngOnInit(): void {
  }

  logout(){
    this.auth.ownerLogout();
  }

}
