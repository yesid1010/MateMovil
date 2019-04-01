import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SocialSharing } from '@ionic-native/social-sharing';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { WpProvider } from '../providers/wp/wp';
import { HttpClientModule } from '@angular/common/http';
import { DetailPage } from '../pages/detail/detail';
import { SearchPage } from '../pages/search/search';
import { RegistroPage } from '../pages/registro/registro';

import { Facebook } from '@ionic-native/facebook';



@NgModule({
  declarations: [
    MyApp,
    HomePage,
    DetailPage,
    SearchPage,
    RegistroPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp,{
      platforms:{
        ios:{
          backButtonText:''
        }
      }
    }),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    DetailPage,
    SearchPage,
    RegistroPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    SocialSharing ,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    WpProvider,
    Facebook
  ]
})
export class AppModule {}
