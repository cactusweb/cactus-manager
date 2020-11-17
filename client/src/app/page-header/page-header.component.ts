import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.css']
})
export class PageHeaderComponent implements OnInit {
  @Input() pageName: string = '';
  @Input() data: string = '';
  @Input() isAdmin: boolean = false;
  userName: string = '';

  ngOnInit(): void {
    this.userName = this.isAdmin ? 'Admin' : localStorage.getItem('userName');
  }

}
