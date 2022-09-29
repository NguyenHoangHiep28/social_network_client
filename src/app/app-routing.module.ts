import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationComponent } from './authentication/authentication.component';
import { LoginComponent } from './authentication/login/login.component';
import { RegisterComponent } from './authentication/register/register.component';
import { LayoutComponent } from './layout/layout.component';
import { MainComponent } from './modules/main/main.component';
import { ProfileComponent } from './modules/main/profile/profile.component';

const routes: Routes = [
  {path: '', redirectTo: 'authenticate/login', pathMatch: 'full'},
  {
    path:'authenticate', component:AuthenticationComponent, children : [
      {path:'login', component:LoginComponent},
      {path:'register', component:RegisterComponent}
    ]
  },
  {path:'index', component:LayoutComponent},
  {path:'main', component:MainComponent,children : [
    {path:'profile', component:ProfileComponent}, 
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
