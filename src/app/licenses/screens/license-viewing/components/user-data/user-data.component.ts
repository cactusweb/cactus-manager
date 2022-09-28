import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/licenses/interfaces/user';

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.scss']
})
export class UserDataComponent implements OnInit {
  user!: User | null

  @Input('user') set _user(val: User|null){
    this.user = null;
    this.user = val;
  } 

  constructor() { }

  ngOnInit(): void {
  }

}
