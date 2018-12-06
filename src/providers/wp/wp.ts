import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the WpProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class WpProvider {
  private API_URL : string = 'https://matemovil.com/wp-json/wp/v2/';
  private url_img : string = 'https://matemovil.com/wp-json/wp/v2/media?parent=';
  public Categories:any = [];
  constructor(public http: HttpClient) {
  
  }
  get(query:string=''){
    return this.http.get(this.API_URL + query);
  }

  getCategories(){
    this.get('categories').subscribe((data)=>{
      this.Categories = data;
    })
  }
 
  gets(query:any){
        return this.http.get(this.url_img+query);
  }

}
