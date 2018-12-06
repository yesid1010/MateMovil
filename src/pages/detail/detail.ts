import { Component,Provider } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the DetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage {

  public posts : any = [];  
  public contenido:  string = '';
  public src : string = '';
  public contenido2:  string = '';
  public url: string = '';

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.posts = navParams.get('post'); 
  }

  ionViewDidLoad() { 
    
    this.AddHtml();
  //  this.cambiarSRC();
    
  }
   
  AddHtml(){
    this.contenido = this.posts.content.rendered;
    this.contenido2 = document.getElementById("contenido").innerHTML = this.contenido;
    return this.contenido2;
  }

  cambiarSRC(){

    this.src = document.getElementsByTagName("iframe")[0].src;

    for(let i=0; i<this.src.length;i++){
        this.url = this.url+this.src[i]; 
    }
    console.log(this.url);
    return this.src; 
    
  }
}
