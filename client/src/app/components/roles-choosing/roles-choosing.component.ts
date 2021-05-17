import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-roles-choosing',
  templateUrl: './roles-choosing.component.html',
  styleUrls: ['./roles-choosing.component.scss']
})
export class RolesChoosingComponent implements OnInit {

  allRoles = [];
  setRoles = [];
  @Input() viewRoles = [];


  @Input() onlyView = false;

  roleName: string = '';

  isShowSelect = false;

  @Output() changeRoles = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
    this.allRoles = JSON.parse(localStorage.getItem('serverRoles') );
    this.getSetRoles();
  }

  addNewRole(){
    let role;
    if ( this.roleName )
      role = this.allRoles.filter( ell => ell.name == this.roleName )[0];
    if ( !role ) return;

    this.roleName = '';
    this.setRoles.push(role);
    this.allRoles = this.allRoles?.filter( ell => ell.id != role.id );
    this.emitRoles()
    
  }

  deleteRole( role ){
    this.setRoles = this.setRoles?.filter( ell => ell.id != role.id );
    this.allRoles.push( role );
    this.emitRoles()
  }

  setInputValue( name ){
    console.log( name )
    this.isShowSelect = false;
    this.roleName = name;
  }

  emitRoles(){
    let arrIds = [];
    this.setRoles.forEach( role => {
      arrIds.push(role.id)
    });

    this.changeRoles.emit(arrIds);
  }

  
  showSelect( show: boolean ){
    if ( show )
      this.isShowSelect = true;
    else 
    setTimeout(() => {
      this.isShowSelect = false;
    }, 100);
  }

  getSetRoles(){
    if ( !this.viewRoles[0] )
      return;
    this.setRoles = this.viewRoles;
    this.setRoles.forEach(role => {
      this.allRoles = this.allRoles.filter( ell => ell.id != role.id );
    });
  }

}
