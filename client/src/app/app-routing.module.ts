import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminAuthComponent } from './auth/admin-auth/admin-auth.component';
import { AdminComponent } from './admin/admin/admin.component';
import { AdminUsersComponent } from './admin/admin-users/admin-users.component';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { KeysComponent } from './owner/keys/keys.component';
import { OwnerApiComponent } from './owner/owner-api/owner-api.component';
import { OwnerComponent } from './owner/owner/owner.component';
import { OwnerGuard } from './shared/guards/owner/owner.guard'
import { IsOwnerGuard } from './shared/guards/isOwner/is-owner.guard'
import { AdminGuard } from './shared/guards/admin/admin.guard'
import { IsAdminGuard } from './shared/guards/isAdmin/is-admin.guard'


const routes: Routes = [

  //auth
  { path: 'login', component: SignInComponent, data: { title: 'Login - CactusManager' }, canActivate: [ OwnerGuard ] },
  { path: 'sign-up', component: SignUpComponent, data: { title: 'SignUp - CactusManager' }, canActivate: [ OwnerGuard ] },
  { path: 'admin-login', component: AdminAuthComponent, canActivate: [ AdminGuard ] },

  //owner
  { path: 'owner', component: OwnerComponent, canActivate: [ IsOwnerGuard ], children: [

    { path: 'keys', component: KeysComponent, data: { pageName:"Keys", title: 'Keys manage - CactusManager'}, },
    { path: 'api', component: OwnerApiComponent, data: { pageName: 'API', title: 'API integration - CactusManager' } },
    { path: '**', redirectTo: 'keys' }

  ]},

  { path: 'admin', component: AdminComponent, canActivate: [ IsAdminGuard ], children: [

    { path: 'users', component: AdminUsersComponent, data: { title: 'Users manage - admin CactusManager' } },
    { path: '**', redirectTo: 'users' }

  ] },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
