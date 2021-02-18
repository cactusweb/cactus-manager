import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IsAuthGuard } from './guards/isAuth/is-auth.guard';
import { AuthGuard } from './guards/auth/auth.guard';
import { AccountComponent } from './screens/account/account.component';
import { LicensesComponent } from './screens/licenses/licenses.component';
import { ApiDocComponent } from './components/api-doc/api-doc.component';
import { SignupComponent } from './screens/signup/signup.component';
import { LoginComponent } from './screens/login/login.component';


const routes: Routes = [
  
  //auth
  { path: 'login', component: LoginComponent, data: { title: 'Login - CactusManager' }, canActivate: [ IsAuthGuard ] },
  { path: 'sign-up', component: SignupComponent, data: { title: 'SignUp - CactusManager' }, canActivate: [ IsAuthGuard ] },


  //owner
  { path: 'account', component: AccountComponent, canActivate: [ AuthGuard ], children: [

    { path: 'licenses', component: LicensesComponent, data: { pageName:"Licenses", title: 'Licenses manage - CactusManager'}, },
    { path: 'api', component: ApiDocComponent, data: { pageName: 'API', title: 'API integration - CactusManager' } },
    { path: '**', redirectTo: 'licenses' }

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
