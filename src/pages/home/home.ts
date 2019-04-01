import { Component ,Provider} from '@angular/core';
import { NavController,NavParams, AlertController, Button } from 'ionic-angular';
import { WpProvider } from '../../providers/wp/wp';
import { DetailPage } from '../detail/detail';
import { SearchPage } from '../search/search';
import { SocialSharing } from '@ionic-native/social-sharing';
import { RegistroPage } from '../registro/registro';
import *as firebase from 'firebase';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public items : any = [];
  public cat :any=[];
  private per_page : number = 5;
  private page : number = 1;
  private showLoadMore : boolean= false;
  private isLoading : boolean = false;
  private category_id: number = 0;

  private aut = firebase.auth();


  login : boolean = false;
  constructor(public navCtrl: NavController,public wp: WpProvider,
    public navParams:NavParams,public alert:AlertController,private socialSharing: SocialSharing) {

      this.observador();
    if(this.navParams.get('cat_id')!=null && this.navParams.get('cat_id') != undefined){
      this.category_id = this.navParams.get('cat_id');
    }

     this.getPost();

  }


 getPost(){
  if(!this.isLoading){
    this.isLoading = true;
    this.wp.get('posts?_embed&per_page='+this.per_page +'&page='+this.page + (this.category_id!=0 ? '&categories='+this.category_id:''))
    .subscribe((data:any)=>{
      this.isLoading = false;
      this.items = this.items.concat(data) ;

      for(let item of this.items){
        this.wp.gets(item.id).subscribe((data) => {
            if(data[0]!=null)
              item.img = data[0].source_url;
        });
      }

      if(data.length===this.per_page){
        this.page++;
        this.showLoadMore = true;
      }else{
        this.showLoadMore =false;
      }
      
    },(error)=>{
        
        if(error.error.code==="rest_post_invalid_page_number"){
          this.showLoadMore = false;
          this.isLoading = false;
          console.log("yesod")
        }
    });
  }
 }


  openDetail(item){
    this.navCtrl.push(DetailPage,{post : item});
  }

  openSearchPage(){
    this.navCtrl.push(SearchPage);
  }

  // metodo para mostrar la catecoria a la que pertenece una entrada
  getCatName(cat_id : number){
    let cat_name : string = '';
    this.wp.Categories.forEach(element => {
        if(element.id == cat_id){
          cat_name = element.name;
        }
    });
    return cat_name;
  }

  changeSort(){
    this.items = [];
    this.showLoadMore = false;
    this.page=1;
    this.getPost();
  }


  // alertas

  getComentario(){
    if(!this.login){
      const alerta = this.alert.create({
        title:'debes iniciar sesion',
        buttons: ['ok']
      });
      alerta.present();
    }else{
      const alerta = this.alert.create({
        title : 'comentar',
        inputs : [
          {
            name : 'comentario',
            placeholder:'comentar'
          }
        ],
        buttons:[
          {
            text : 'comentar',
            handler: data =>{
              console.log(data.comentario);
            }
          }
        ]
      })
      alerta.present();
    }

  }


  getLike(){
    if(!this.login){
      const alerta = this.alert.create({
        title:'debes iniciar sesion',
        buttons: ['ok']
      });
      alerta.present();
    }else{
    let alert = this.alert.create({
        title:'Aun no disponible',
        buttons: [
          {
            text : 'ok',
            role: 'cancel'
          }
        ]
    })
    .present();
  }
  }


  // funcion para compartir las entradas por redes sociales
  share(item_link:string=''){
    this.socialSharing.share('','','',item_link)
    .then(()=>{

    }).catch(()=>{
      
    })
  }

  // funcion para redirigir a la pagina de inicio de sesion
  inicioSesion(){
    this.navCtrl.push(RegistroPage);
  }

/// funcion para ver el estado del login 
  observador(){  
    this.aut.onAuthStateChanged((user)=> {
      if (user) {
        this.login = true;
        let email = user.email;
        let username = user.displayName;
        let uid = user.uid;
        this.addUser({username,email,uid});
      }else 
        {
          this.login = false;
        }
    }); 
  }

  /// agregar usuarios registrados a la base de datos
    addUser(user){ 
      let usuario = {
        uid : user.uid,
        username : user.username,
        email : user.email
      }
      firebase.database().ref("users/"+user.uid)
      .set(usuario);
    }
  }

