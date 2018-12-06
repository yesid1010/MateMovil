import { Component ,Provider} from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';
import { WpProvider } from '../../providers/wp/wp';
import { DetailPage } from '../detail/detail';
import { SearchPage } from '../search/search';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public items : any = [];
  private per_page : number = 5;
  private page : number = 1;
  private showLoadMore : boolean= false;
  private isLoading : boolean = false;
  private category_id: number = 0;
  private sort:string = '0';

  constructor(public navCtrl: NavController,public wp: WpProvider,public navParams:NavParams) {
    if(this.navParams.get('cat_id')!=null && this.navParams.get('cat_id') != undefined){
      this.category_id = this.navParams.get('cat_id');
    }
    this.getPost();
  }

  getPost(infiniteScroll=null){
    if(!this.isLoading){
      this.isLoading = true;
      if(infiniteScroll!=null && infiniteScroll.ionRefresh){
          this.page=1;
      }
      this.wp.get('posts?_embed&per_page='+this.per_page +'&page='+this.page + (this.category_id!=0 ? '&categories='+this.category_id:''))
     .subscribe((data:any)=>{
        this.isLoading = false;  
        this.items = infiniteScroll!=null && infiniteScroll.ionRefresh ? data : this.items.concat(data);

        for(let item of this.items){
          this.wp.gets(item.id).subscribe((data) => {
              if(data[0]!=null)
                item.img = data[0].source_url;
          });
        }
        
        if(data.length === this.per_page){
          this.page++;
        }

        if(infiniteScroll!=null){
          infiniteScroll.complete();
        }

      }, (error)=>{
        this.isLoading = false;
        if(infiniteScroll!=null){
          infiniteScroll.complete();
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

}
