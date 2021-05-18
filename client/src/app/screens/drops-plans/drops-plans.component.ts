import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-drops-plans',
  templateUrl: './drops-plans.component.html',
  styleUrls: ['./drops-plans.component.scss']
})
export class DropsPlansComponent implements OnInit {
  plans: any = [];
  plansLoaded = true;
  dropsLoaded = true;

  dropsLoadNow = false;
  plansLoadNow = false;

  load_error = false;
  

  constructor() { }

  ngOnInit(): void {
  }

  onRefreshLoad(){
    if ( !this.plansLoaded )
      this.plansLoadNow = true;
    if ( !this.dropsLoaded )
      this.dropsLoadNow = true;
    this.dropsLoaded = true;
    this.plansLoaded = true;
    setTimeout(() => {
      this.dropsLoadNow = false;
      this.plansLoadNow = false;
      
    }, 10);

  }

}
