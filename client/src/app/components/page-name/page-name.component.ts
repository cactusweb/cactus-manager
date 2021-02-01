import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-name',
  templateUrl: './page-name.component.html',
  styleUrls: ['./page-name.component.css']
})
export class PageNameComponent implements OnInit {
  @Input() pageName: string = '';
  @Input() isDataShow: boolean = false;
  userName: string = '';
  id: string = '';

  ngOnInit(): void {
    this.userName = localStorage.getItem('name');
    this.id = localStorage.getItem('ownerId')
  }


}
