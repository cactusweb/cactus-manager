import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthLoginComponent } from './components/auth-login/auth-login.component';
import { IsAuthGuard } from './guards/isAuth/is-auth.guard';
import { AuthGuard } from './guards/auth/auth.guard';
import { AuthSignupComponent } from './components/auth-signup/auth-signup.component';
import { SideBarComponent } from './components/account-components/side-bar/side-bar.component';
import { AccountComponent } from './components/account/account.component';
import { LicensesComponent } from './components/account-components/licenses/licenses.component';
import { ApiDocComponent } from './components/account-components/api-doc/api-doc.component';


const routes: Routes = [
  
  //auth
  { path: 'login', component: AuthLoginComponent, data: { title: 'Login - CactusManager' }, canActivate: [ IsAuthGuard ] },
  { path: 'sign-up', component: AuthSignupComponent, data: { title: 'SignUp - CactusManager' }, canActivate: [ IsAuthGuard ] },


  //owner
  { path: 'account', component: AccountComponent, canActivate: [ AuthGuard ], children: [

    { path: 'users', component: LicensesComponent, data: { pageName:"Keys", title: 'Keys manage - CactusManager'}, },
    { path: 'api', component: ApiDocComponent, data: { pageName: 'API', title: 'API integration - CactusManager' } },
    { path: '**', redirectTo: 'users' }

  ]},

  // { path: 'admin', component: AdminComponent, canActivate: [ IsAdminGuard ], children: [

  //   { path: 'users', component: AdminUsersComponent, data: { title: 'Users manage - admin CactusManager' } },
  //   { path: '**', redirectTo: 'users' }

  // ] },
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
