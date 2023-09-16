import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountComponent } from "./account.component";

const routes: Routes = [
    { path: '', component: AccountComponent, children: [
        { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

        { path: 'dashboard', loadChildren: () => import('../dashboard/dashboard.module').then(m => m.DashboardModule), data: { pageName: 'Dashboard' } },
        { path: 'licenses', loadChildren: () => import('../licenses/licenses.module').then(m => m.LicensesModule), data: { pageName: 'Licenses' } },
        { path: 'referrals', loadChildren: () => import('../referrals/referrals.module').then(m => m.ReferralsModule), data: { pageName: 'Referral points' } },
        { path: 'drops', loadChildren: () => import('../drops/drops.module').then(m => m.DropsModule), data: { pageName: 'Drops & Plans' } },
        { path: 'api-doc', loadChildren: () => import('../api-doc/api-doc.module').then(m => m.ApiDocModule), data: { pageName: 'API' } },
        { path: 'settings', loadChildren: () => import('../settings/settings.module').then(m => m.SettingsModule), data: { pageName: 'Settings' } },
        { path: 'audit-logs', loadChildren: () => import('../audit-logs/audit-logs.module').then(m => m.AuditLogsModule), data: { pageName: 'Audit logs' } },

        { path: 'ryodan', loadChildren: () => import('../ryodan-customization/ryodan-customization.module').then(m => m.RyodanCustomizationModule), data: { pageName: 'Ryodan' } },

        { path: '**', redirectTo: 'dashboard' }
    ]}
]


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AccountRoutingModule { }