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
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthenticationService } from './services/authentication.service';
import { SharedModule } from './shared/share.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './pages/home/home.component';
import { FormPostComponent } from './pages/home/form-post/form-post.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ActiveComponent } from './authentication/active/active.component';
import { AuthInterceptor } from './http-interceptor/authInterceptor';

@NgModule({
  declarations: [
    AppComponent,
    AuthenticationComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    FooterComponent,
    LayoutComponent,
    HomeComponent,
    FormPostComponent,
    ProfileComponent,
    ActiveComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
    NgbModule
  ],
  providers: [AuthenticationService, {
    provide : HTTP_INTERCEPTORS,
    useClass : AuthInterceptor,
    multi : true,
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
