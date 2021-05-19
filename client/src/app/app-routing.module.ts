import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IsAuthGuard } from './guards/isAuth/is-auth.guard';
import { AuthGuard } from './guards/auth/auth.guard';
import { AccountComponent } from './screens/account/account.component';
import { LicensesComponent } from './screens/licenses/licenses.component';
import { ApiDocComponent } from './components/api-doc/api-doc.component';
import { SignupComponent } from './screens/signup/signup.component';
import { LoginComponent } from './screens/login/login.component';
import { ProfileComponent } from './screens/profile/profile.component';
import { NotFoundComponent } from './screens/not-found/not-found.component';
import { DropsPlansComponent } from './screens/drops-plans/drops-plans.component';
import { SettingsComponent } from './screens/settings/settings.component';
import { AuditLogComponent } from './screens/audit-log/audit-log.component';
import { DashboardComponent } from './screens/dashboard/dashboard.component';


const routes: Routes = [
  
  //auth
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent, data: { title: 'Login - CactusManager' }, canActivate: [ IsAuthGuard ] },
  { path: 'sign-up', component: SignupComponent, data: { title: 'SignUp - CactusManager' }, canActivate: [ IsAuthGuard ] },


  //owner
  { path: 'account', component: AccountComponent, canActivate: [ AuthGuard ], children: [

    { path: '', redirectTo: 'licenses', pathMatch: 'full'},
    { path: 'licenses', component: LicensesComponent, data: { pageName:"Licenses", title: 'Licenses manage - CactusManager'}, },
    { path: 'profile', component: ProfileComponent, data: { pageName:"Profile", title: 'Profile - CactusManager'}, },
    { path: 'drops', component: DropsPlansComponent, data: { pageName:"Drops", title: 'Drops - CactusManager'}, },
    { path: 'settings', component: SettingsComponent, data: { pageName: 'Settings', title: 'Settings - CactusManager' } },
    { path: 'audit', component: AuditLogComponent, data: { pageName: 'Audit log', title: 'Audit log - CactusManager' } },
    { path: 'api', component: ApiDocComponent, data: { pageName: 'API', title: 'API integration - CactusManager' } },
    { path: 'dashboard', component: DashboardComponent, data: { pageName: 'Dashboard', title: 'Dashboard - CactusManager' } },
    { path: '**', component: NotFoundComponent, data: { showLogo: false, redirectTo: '/account/licenses', title: '404 - CactusManager' } }

  ]},

  // { path: 'admin', component: AdminComponent, canActivate: [ IsAdminGuard ], children: [

  //   { path: 'users', component: AdminUsersComponent, data: { title: 'Users manage - admin CactusManager' } },
  //   { path: '**', redirectTo: 'users' }

  // ] },
  
  { path: '**', component: NotFoundComponent, data: { showLogo: true, redirectTo: '/login', title: '404 - CactusManager' } },
  // { path: '**', redirectTo: '/404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
