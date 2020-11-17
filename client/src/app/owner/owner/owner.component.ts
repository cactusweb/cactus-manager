import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { OwnerService } from 'src/app/shared/services/owner/owner.service';

@Component({
  selector: 'app-owner',
  templateUrl: './owner.component.html',
  styleUrls: ['./owner.component.css']
})
export class OwnerComponent implements OnInit {
  firstLoad: boolean = true;

  constructor(
    private http: OwnerService,
    private auth: AuthService,
    private spinner: NgxSpinnerService
  ) { 
    
  }

  async ngOnInit() {
    this.spinner.show();
    if (localStorage.getItem('ownerAccessToken'))
      await this.http.getSelf()
        .then( (w: any = {}) =>{
          localStorage.setItem('ownerName', w.name);
          localStorage.setItem('ownerEmail', w.email);
        })
        .catch( e => {
          console.log(e);
          if ( e.status == 401 ){
            this.auth.ownerLogout();

          }
        })
    this.spinner.hide();
    this.firstLoad = false;
     
  }

}
