import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { map, Subscription } from 'rxjs';
import { DropsService } from '../../services/drops.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() onOpenDropForm = new EventEmitter();

  dropStats = {
    active: 0,
    complete: 0
  }
  sub!: Subscription

  constructor(
    private dropsService: DropsService
  ) { }

  ngOnInit(): void {
    this.getDropStats();
  }


  getDropStats(){
    this.sub = this.dropsService.getDrops()
      .pipe(
        map(drops => {
          return {
            active: drops.filter(d => d.status == 'started').length,
            complete: drops.filter(d => d.status == 'stopped').length
          } 
        })
      )
      .subscribe({
        next: stat => this.dropStats = stat,
        error: () => {}
      })
  }

}
