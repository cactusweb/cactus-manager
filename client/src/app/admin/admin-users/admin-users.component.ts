import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from 'src/app/shared/services/admin/admin.service';
import { AIOService } from 'src/app/shared/services/AIO/aio.service';
import { SeoService } from 'src/app/shared/services/seo/seo.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit {
  newKey: boolean = false;
  formEditUser: FormGroup;

  users: any = [];
  editingUser: any = {};

  searchParam: string = '';
  searchKeys = ['name', 'addedAt', 'outputExpiresIn']

  constructor(
    private activatedRoute: ActivatedRoute,
    private seo: SeoService,
    private http: AdminService,
    private aio: AIOService,
    private spinner: NgxSpinnerService,
    private auth: AuthService,
  ) { 
    let data: any = this.activatedRoute.data.pipe();
    data = data._value;
    this.seo.changeTitle(data.title);
  }

  async ngOnInit() {
    await this.getUsers();
    this.generateFormGroup();
  }

  async getUsers(){
    this.spinner.show()
    await this.http.getUsers()
      .then( (w: any = []) => {
        this.users = w.map(user => ({
          ...user,
          addedAt: this.aio.outputDate(new Date(user.addedAt)),
          outputExpiresIn: this.aio.outputDate(new Date(user.expiresIn)),
          expiresIn: new Date(user.expiresIn)
        }))
        this.spinner.hide();
      })
      .catch( e => {
        if (e.status == 401)
          this.auth.adminLogout();
        console.log(e)})
  }

  async onDeleteUser(id){
    this.spinner.show()
    await this.http.deleteUser(id)
      .then( async() => {
        await this.getUsers()
      })
      .catch( e => {
        if (e.status == 401){
          this.spinner.hide()
          this.auth.adminLogout();
        }
        console.log(e)
      })
  }

  async editUser(id){
    this.users.forEach(user => {
      if (user._id == id){
        this.editingUser = user;
        this.generateFormGroup();
        return false;
      }
    });
  }

  async onEditUser(){
    this.spinner.show()
    await this.http.putUser(this.formEditUser.value)
      .then( async() => {await this.getUsers(); this.formEditUser.reset(); this.editingUser = {};})
      .catch( e => {
        if (e.status == 401){
          this.spinner.hide()
          this.auth.adminLogout();
        }
        console.log(e)
      } )
  }
  
  onCancelEdit(){
    this.editingUser = {};
    this.formEditUser.reset();
  }

  generateFormGroup(){
    console.log(this.editingUser)
    this.formEditUser = new FormGroup({
      id: new FormControl( { value: this.editingUser._id || '', disabled: false } ),
      // name: new FormControl( { value: this.editingUser.name || '', disabled: false } ),
      expiresIn: new FormControl( { value: this.aio.validDate(this.editingUser.expiresIn) || '', disabled: false } ),
    })
  }


  onChangeNewKey(status: boolean){
    this.newKey = status;
  }

}
