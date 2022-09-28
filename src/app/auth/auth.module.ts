import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SignInComponent } from './screens/sign-in/sign-in.component';
import { SignUpComponent } from './screens/sign-up/sign-up.component';
import { AuthComponent } from './auth.component';
import { SocialLinksComponent } from './components/social-links/social-links.component';
import { ToolsModule } from '../tools/tools.module';

const routes: Routes = [
  { path: '', component: AuthComponent, children: [
    { 
      path: 'login', 
      component: SignInComponent, 
      data: { 
        title: 'Login - CactusManager',
        descript: 'Login page - Cactus Manager. Auth now to manage your Dashboard.'
      } 
    },
  
    {
      path: 'sign-up',
      component: SignUpComponent,
      data: {
        title: 'Registration - CactusManager',
        descript: 'Registration - Cactus Manager. Manage your dashboard now! If you dont have the key - contact us.'
      }
    },
  
  
    { path: '**', redirectTo: 'login' },
  ]}
]

@NgModule({
  declarations: [
    SignInComponent,
    SignUpComponent,
    AuthComponent,
    SocialLinksComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    ToolsModule
  ]
})
export class AuthModule { }
