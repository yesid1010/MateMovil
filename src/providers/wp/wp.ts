import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


/*
  Generated class for the WpProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class WpProvider {
  private API_URL : string = 'https://matemovil.com//wp-json/wp/v2/';
  private url_img : string = 'https://matemovil.com/wp-json/wp/v2/media?parent=';
  private url_comentarios : string = 'https://matemovil.com/wp-json/wp/v2/comments?post=';
  public Categories:any = [];
  private per_page : number=13;

  constructor(public http: HttpClient) {
  
  }
  get(query:string=''){
    return this.http.get(this.API_URL + query);
  }

  getCategories(){
    let i = 0;
    this.get('categories?_embed&per_page='+this.per_page)
    .subscribe((data:any)=>{
      for(i=0;i < data.length;i++){
         if(data[i].count >= 0){
          this.Categories[i] = data[i];
          console.log(data[i].name)
        }
      }      

    })
  }
 
  gets(query:any){
        return this.http.get(this.url_img+query);
  }

  getComentario(query:any){
    return this.http.get(this.url_comentarios+query);
  }
}
