import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { WpProvider } from '../../providers/wp/wp';
import { DetailPage } from '../detail/detail';
/**
 * Generated class for the SearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {
  searchQuery : string = '';
  public items : any = [];
  private per_page : number = 5;
  private page : number = 1;
  private showLoadMore : boolean= false;
  private isLoading : boolean = false; 
  
  constructor(public navCtrl: NavController, public navParams: NavParams,public wp : WpProvider) {
    this.getPost();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
  }
  onSearch(){
    this.items = [];
    this.getPost();
  }

  getPost(){
    //if(!this.isLoading && this.searchQuery.length > 0){
      this.isLoading = true;
      this.wp.get('posts?_embed&per_page='+this.per_page +'&page='+this.page+'&search='+this.searchQuery)
      .subscribe((data:any)=>{
        this.isLoading = false;  
        this.items = this.items.concat(data);
        
        for(let item of this.items){
          this.wp.gets(item.id).subscribe((data) => {
              if(data[0]!=null)
                item.img = data[0].source_url;
          });
        }

        if(data.length === this.per_page){
        this.page++;
        this.showLoadMore = true;
        }else{
          this.showLoadMore=false;
        }
      }, (error)=>{
        this.isLoading = false;
        if(error.error.code = "rest_post_invalid_page_number"){
          this.showLoadMore = false;
        }
      });

   // }
  }

  clearSearch(){
    this.searchQuery = '';
    this.items = [];
    this.page = 1;
    this.showLoadMore=false;
  }

  getCatName(cat_id : number){
    let cat_name : string = '';
    this.wp.Categories.forEach(element => {
        if(element.id == cat_id){
          cat_name = element.name;
        }
    });
    return cat_name;
  }

  openDetail(item){
    this.navCtrl.push(DetailPage,{post : item});
  }


  getItems(ev: any) {
    // Reset items back to all of the items
    this.getPost();

    // set val to the value of the searchbar
    const val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        return (item.title.rendered.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }
}
