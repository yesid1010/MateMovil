import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { WpProvider } from '../providers/wp/wp';
import { HttpClientModule } from '@angular/common/http';
import { DetailPage } from '../pages/detail/detail';
import { SearchPage } from '../pages/search/search';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    DetailPage,
    SearchPage
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
    SearchPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    WpProvider
  ]
})
export class AppModule {}
