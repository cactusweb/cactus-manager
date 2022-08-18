import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IsAuthGuard } from './guards/isAuth/is-auth.guard';
import { ToHomeGuard } from './guards/toHome/to-home.guard';
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
import { AppComponent } from './app.component';
import { ReferralsComponent } from './screens/referrals/referrals.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/login' },
  

  //auth
  { path: 'login', component: LoginComponent, data: { 
      title: 'Login - CactusManager',
      descript: 'Login page - Cactus Manager. Auth now to manage your Dashboard.'
    }, canActivate: [ IsAuthGuard ] 
  },
  { path: 'sign-up', component: SignupComponent, data: { 
      title: 'SignUp - CactusManager',
      descript: 'Sign up - Cactus Manager. Manage your dashboard now! If you dont have the key - contact us.'
    }, canActivate: [ IsAuthGuard ] 
  },


  //owner
  { path: 'account', component: AccountComponent, children: [

    { path: '', redirectTo: 'dashboard', pathMatch: 'full'},
    
    { path: 'licenses', component: LicensesComponent, data: { 
        pageName:"Licenses", title: 'Licenses manage - CactusManager',
        descript: 'License manager - Cactus Manager. View, editing, deliting of license keys and their activations. Get started now!'
      }, 
    },
    { path: 'referrals', component: ReferralsComponent, data: { 
        pageName:"Referrals", title: 'Referrals info - CactusManager',
        descript: 'Referrals info - Cactus Manager. Info about referral system. Get started now!'
      }, 
    },
    { path: 'profile', component: ProfileComponent, data: { 
        pageName:"Profile", title: 'Profile - CactusManager',
        descript: 'Profile data - Cactus Manager. Create your dashboard right now and get your first profit!'
      }, 
    },
    { path: 'drops', component: DropsPlansComponent, data: { 
        pageName:"Drops", title: 'Drops - CactusManager',
        descript: 'Drops and plans - Cactus Manager. Create a drop and send it to your customers.'
      }, 
    },
    { path: 'settings', component: SettingsComponent, data: { 
        pageName: 'Settings', title: 'Settings - CactusManager',
        descript: 'Settings - Cactus Manager. Manage your account and dashboard data.'
      } 
    },
    { path: 'audit', component: AuditLogComponent, data: { 
        pageName: 'Audit log', title: 'Audit log - CactusManager',
        descript: 'Audit log - Cactus Manager. View the activity of your users and the past changes in the audit log.'
      } 
    },
    { path: 'api', component: ApiDocComponent, data: { 
        pageName: 'API', title: 'API integration - CactusManager',
        descript: 'API Documentation - Cactus Manager. Convenient key authorization for your users. Connection documentation.' 
      } 
    },
    { path: 'dashboard', component: DashboardComponent, data: { 
        pageName: 'Dashboard', title: 'Dashboard - CactusManager',
        descript: 'Dashboard - Cactus Manager. View statistics of your business in the current time and for the past months.' 
      } 
    },
    { path: '**', component: NotFoundComponent, data: { 
        showLogo: false, redirectTo: '/account/dashboard', title: '404 - CactusManager',
        descript: 'Not Found - Cactus Manager. Page not found - Go to Home.'
      } 
    }

  ]},
  
  { path: '**', component: NotFoundComponent, data: { 
      showLogo: true, redirectTo: '/', title: '404 - CactusManager',
      descript: 'Not Found - Cactus Manager. Page not found - Go to Home.'
    } 
  },
  // { path: '**', redirectTo: '/404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
