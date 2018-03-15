import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { RouterModule, Routes} from '@angular/router';

//components
import { AppComponent } from './app.component';
import { LoginpageComponent } from './loginpage/loginpage.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { UploaderComponent } from './uploader/uploader.component';
import { LogoutComponent } from './logout/logout.component';

import { GuestpostComponent } from './guestpost/guestpost.component';


import {PushmessageComponent} from './pushmessage/pushmessage.component';



//services
import { environment } from '../environments/environment';
import { AuthService } from './services/auth.service';
import { ItemService } from './services/item.service';


import { MarkdownService } from './services/markdown.service';
import { CookieService, CookieOptions } from 'angular2-cookie/core';
import { FileuploadService } from './services/fileupload.service';
//guard
import { AuthguardGuard } from './authguard.guard';

//firebase modules
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { FirebaseApp } from 'angularfire2';
import { Observable } from 'rxjs/Observable';
import { MainuploadComponent } from './mainupload/mainupload.component';


// Http client (used for sending POST request for push ~Eric)
import {HttpClientModule} from '@angular/common/http';
import { DownloadpageComponent } from './downloadpage/downloadpage.component';
import { pushService } from './services/push.service';

export const firebaseConfig = {
      apiKey: "AIzaSyC6empcDciB_guvtZiNwFk7R-lTVThpPeQ",
      authDomain: "perfitdental-7951d.firebaseapp.com",
      databaseURL: "https://perfitdental-7951d.firebaseio.com",
      projectId: "perfitdental-7951d",
      storageBucket: "perfitdental-7951d.appspot.com",
      messagingSenderId: "539232777666"
}


const appRoutes:Routes = [
  {
    path: '',
    component: LoginpageComponent
  },

  {
    path: 'dashboard',
    canActivate: [AuthguardGuard],
    component: DashboardComponent
  },
  {
    path: 'uploader',
    canActivate: [AuthguardGuard],
    component: UploaderComponent
  },
  {
    path: 'mainupload',
    canActivate: [AuthguardGuard],
    component: MainuploadComponent
  },
  {

   path: 'pushmessage',
   canActivate: [AuthguardGuard],
   component: PushmessageComponent

  },
  {

    path: 'downloadpage',
    canActivate: [AuthguardGuard],
    component: DownloadpageComponent
 
   },
   {
    path: 'guestpost',
    component: GuestpostComponent
   },
  {
    path: 'logout',
    component: LogoutComponent
  }

]

@NgModule({
  declarations: [
    AppComponent,
    LoginpageComponent,
    DashboardComponent,
    HeaderComponent,
    FooterComponent,
    UploaderComponent,
    LogoutComponent,
    MainuploadComponent,    
    PushmessageComponent, DownloadpageComponent, GuestpostComponent,    

  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [pushService,{ provide: CookieOptions, useValue: {} },AuthguardGuard,CookieService, AuthService,ItemService,MarkdownService, FileuploadService],
  bootstrap: [AppComponent]
})
export class AppModule { }
