import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { LoginComponent } from './authentication/login/login.component';
import { RegisterComponent } from './authentication/register/register.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { LayoutComponent } from './layout/layout.component';
import { MainComponent } from './modules/main/main.component';
import { ProfileComponent } from './modules/main/profile/profile.component';
import { IndexComponent } from './modules/main/index/index.component';
import { ShortcutsComponent } from './modules/main/shortcuts/shortcuts.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthenticationComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    FooterComponent,
    LayoutComponent,
    MainComponent,
    ProfileComponent,
    IndexComponent,
    ShortcutsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
