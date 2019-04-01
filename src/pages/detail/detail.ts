import { Component,Provider } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';
import { WpProvider } from '../../providers/wp/wp';
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
  public contenido2:  string = '';
  public comentarios:any =[];
  public respuesta : any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,private socialSharing: SocialSharing,
    private wp:WpProvider) {
    this.posts = navParams.get('post'); 
    //this.getComentarios();
  }


  getComentarios(){
    let i=0; let j=0;
      this.wp.getComentario(this.posts.id+'&order=asc').subscribe((data:any)=>{
      //  console.log(data);
        for(i=0;i< data.length;i++){
          if(data[i].parent == 0){
            this.comentarios[i]= data[i]
            console.log(data[i])
          }
        }
        
      })     
  }
  
  

  ionViewDidLoad() { 
    (function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = 'https://connect.facebook.net/es_LA/sdk.js#xfbml=1&version=v3.2&appId=526182504551678&autoLogAppEvents=1';
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
    this.AddHtml();

    
  }
   
  AddHtml(){
    this.contenido = this.posts.content.rendered;
    this.contenido2 = document.getElementById("contenido").innerHTML = this.contenido;
    return this.contenido2;
  }

  share(item_link:string=''){
    this.socialSharing.share('','','',item_link)
    .then(()=>{

    }).catch(()=>{
      
    })
  }
}
