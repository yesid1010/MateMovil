import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, FabButton } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
import { WpProvider } from '../providers/wp/wp';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import *as firebase from 'firebase';
import {firebaseConfig} from './envroiment'
//import *as firebase from 'firebase'

 
  



@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  //private aut = firebase.auth();
  private login : boolean = false;
  private username : string = '';
  private foto : string='';
  constructor(private fb: Facebook, public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,public wp : WpProvider) {
    this.initializeApp();
    this.observador();
    this.loginf();
  }

  loginf(){
     
    if(this.fb.getLoginStatus()){
        console.log('estas conectado')
    }else{
      console.log('no estas conectado')
    }
  }
  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.wp.getCategories();
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
    firebase.initializeApp(firebaseConfig);

    
  }

  openPage(cat_id: number = 0) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    
    this.nav.setRoot(HomePage,{cat_id: cat_id});
  }

  observador(){  
   firebase.auth().onAuthStateChanged((user)=> {
        if (user) {
         this.login = true;
         this.username = user.displayName;
         this.foto = user.photoURL;
        } else {

          this.login = false;
        }
      });
     
  }

  cerrar(){
    firebase.auth().signOut()
    .then(()=>{
      this.login=false;
    })
    .catch((error)=>{
      console.log(error)
    })
  }


}
