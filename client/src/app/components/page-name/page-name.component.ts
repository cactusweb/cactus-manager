import { Component, Input, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-name',
  templateUrl: './page-name.component.html',
  styleUrls: ['./page-name.component.scss']
})
export class PageNameComponent implements OnChanges {
  @Input() pageName: string = '';
  @Input() isDataShow: boolean = false;
  userName: string = '';
  id: string = '';
  avatar: string = '';

  ngOnChanges(){
    this.id = localStorage.getItem('ownerId');
    this.userName = localStorage.getItem('name');
    this.avatar = localStorage.getItem( 'ownerAvatar' )
  }

  


}
