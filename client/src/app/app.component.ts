import { AfterContentInit, AfterViewChecked, Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from './shared/services/auth/auth.service';
import { OwnerService } from './shared/services/owner/owner.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'CactusManager';
  firstLoad: boolean = true;

  constructor(
    private http: OwnerService,
    private auth: AuthService,
    private spinner: NgxSpinnerService
  ){}

  async ngOnInit(){
  }
  
}
