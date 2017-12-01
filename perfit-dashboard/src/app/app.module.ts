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
import { UploadImageComponent } from './upload-image/upload-image.component';

//services
import { environment } from '../environments/environment';
import { AuthService } from './services/auth.service';
import { ItemService } from './services/item.service';
import { CookieService } from 'angular2-cookie/services/cookies.service';

//guard
import { AuthguardGuard } from './authguard.guard';

//firebase modules
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { FirebaseApp } from 'angularfire2';

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
    path: 'upload-image',
    canActivate: [AuthguardGuard],
    component: UploadImageComponent
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
    UploadImageComponent,    
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    FormsModule
  ],
  providers: [AuthguardGuard,CookieService, AuthService,ItemService],
  bootstrap: [AppComponent]
})
export class AppModule { }
