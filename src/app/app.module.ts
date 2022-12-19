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
import { ProfileComponent } from './pages/profile/profile.component';
import { ActiveComponent } from './authentication/active/active.component';
import { AuthInterceptor } from './http-interceptor/authInterceptor';
import { NewPostComponent } from './pages/home/new-post/new-post.component';
import { CreateComponent } from './pages/home/create/create.component';
import { CollectionComponent } from './pages/collection/collection.component';
import { IndexComponent } from './pages/collection/index/index.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HomeModel } from './pages/home/models/HomeModel';

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
    ProfileComponent,
    ActiveComponent,
    NewPostComponent,
    CreateComponent,
    CollectionComponent,
    IndexComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
    NgbModule,
    CommonModule,
  ],
  providers: [AuthenticationService, {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
  }, HomeModel],
  bootstrap: [AppComponent]
})
export class AppModule { }
