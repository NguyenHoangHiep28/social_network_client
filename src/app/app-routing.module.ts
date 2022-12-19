import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActiveComponent } from './authentication/active/active.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { LoginComponent } from './authentication/login/login.component';
import { RegisterComponent } from './authentication/register/register.component';
import { LayoutComponent } from './layout/layout.component';
import { CollectionComponent } from './pages/collection/collection.component';
import { CreateComponent } from './pages/home/create/create.component';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';

const routes: Routes = [
  // { path: '', redirectTo: 'authenticate/login', pathMatch: 'full' },

  // {
  //   path: 'authenticate',
  //   component: AuthenticationComponent,
  //   children: [
  //     { path: 'login', component: LoginComponent },
  //     {
  //       path: 'register',
  //       component: RegisterComponent,
  //     },
  //     {
  //       path: 'active',
  //       component: ActiveComponent,
  //     },
  //   ],
  // },
  {
    path: 'dashboard',
    component: LayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'create', component: CreateComponent },
      { path: 'create/:id', component: CreateComponent },

    ],
  },
  {
    path: 'collection',
    component: CollectionComponent,
    children: [
      { path: '', component: HomeComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
