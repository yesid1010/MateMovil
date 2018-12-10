import { Component ,Provider} from '@angular/core';
import { NavController,NavParams, AlertController } from 'ionic-angular';
import { WpProvider } from '../../providers/wp/wp';
import { DetailPage } from '../detail/detail';
import { SearchPage } from '../search/search';


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
  private sort:string = '0';
  private count : boolean = false;
  constructor(public navCtrl: NavController,public wp: WpProvider,public navParams:NavParams,public alert:AlertController) {
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
    const alerta = this.alert.create({
      title:'debes iniciar sesion',
      buttons: ['ok']
    });
    alerta.present();
  }

  iniciarsesion(){
    const prompt = this.alert.create({
      title: 'Login',
      message: "Iniciar sesion con facebook",
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'ok', 
          handler: data => {
            console.log('ok')
          }
        }
      ]
    });
    prompt.present();
  }
  }
