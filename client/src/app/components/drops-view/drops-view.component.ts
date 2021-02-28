import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/services/auth/auth.service';
import { HttpService } from 'src/app/services/http/http.service';
import { SeoService } from 'src/app/services/seo/seo.service';

@Component({
  selector: 'app-drops-view',
  templateUrl: './drops-view.component.html',
  styleUrls: ['./drops-view.component.scss']
})
export class DropsViewComponent implements OnInit {
  isNewDrop: boolean = false;

  drops;

  constructor(
    private activatedRoute: ActivatedRoute,
    private seo: SeoService,
    private spinner: NgxSpinnerService,
    private http: HttpService,
    private auth: AuthService
  ) { 
    let data: any = this.activatedRoute.data.pipe();
    data = data._value;
    this.seo.changeTitle(data.title);
  }

  async ngOnInit() {
    await this.getDrops();
  }

  closeDropGen(){
    this.isNewDrop = false;
  }


  async getDrops(){
    this.spinner.show();
    await this.http.getDrops()
      .then( ( w: any ) => {
        this.drops = w;
        this.spinner.hide();
      })
      .catch( e => {
        if ( e.status == 401 ){
          this.auth.logout();
          this.spinner.hide();
        }
      })
  }


}
