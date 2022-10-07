import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IsAuthGuard } from './tools/guards/is-auth.guard';


const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: '/auth/login' },

    { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule), canActivate: [IsAuthGuard] },
    { path: 'account', loadChildren: () => import('./account/account.module').then(m => m.AccountModule) },

    { path: 'login', redirectTo: '/auth/login' },
    { path: '**', loadChildren: () => import('./not-found/not-found.module').then(m => m.NotFoundModule) }
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }