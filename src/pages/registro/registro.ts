import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import *as firebase from 'firebase';
import {snapshotToArray} from '../../app/envroiment'
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { HttpClient } from '@angular/common/http';

/**
 * Generated class for the RegistroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-registro',
  templateUrl: 'registro.html',
})


export class RegistroPage {
  items_realtime =[];
  items_cloud =[];

  realtime = firebase.database().ref('mensaje/');
  cloud = firebase.firestore();
  aut = firebase.auth();
  autgoogle = new firebase.auth.GoogleAuthProvider();

  public login : boolean = false;

  /*name :string ='';
  last:string ='';

  username : string = '';
  email : string = '';
  pass : string = '';

  //// aut
  /// Registro
  correo:string='';
  contrasena :string = '';

  /// iniciar sesion
  correo2 : string = '';
  contrasena2 : string = '';*/

  users : any = {};
  info : any ={};
  constructor(private http: HttpClient, private fb: Facebook,public navCtrl: NavController, public navParams: NavParams,public alert: AlertController) {
    this.cloud.settings({timestampsInSnapshots:true}); 


    /*this.realtime.on('value',resp =>{
        this.items_realtime = snapshotToArray(resp);
      });*/


  }

  fblogin(){
    this.fb.login(['public_profile', 'email'])
    
    .then((res: FacebookLoginResponse) =>{
      if(res.status === 'connected'){
      
      this.users.img = 'https://graph.facebook.com/'+res.authResponse.userID+'/picture?type=square';
      this.getdata(res.authResponse.accessToken);
      }else{

        alert('login failed');
      }
      console.log('Logged into Facebook!', res)
    })
    .catch(e => console.log('Error logging into Facebook', e));
  }

  getdata(acces_token : string){
    let url = 'https://graph.facebook.com/me?fields=id,name,first_name,last_name,email&access_token='+acces_token;

    this.http.get(url).subscribe((data:any)=>{
      this.info.id = JSON.stringify(data.id);
      this.info.name = JSON.stringify(data.name);
      this.info.email = JSON.stringify(data.email);
      this.info.first_name = JSON.stringify(data.first_name);
    })
  }

  
  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistroPage');

    //this.getItems();

    //this.observador();
  }




  /// aut google

  iniciarGoogle(){
    firebase.auth().signInWithPopup(this.autgoogle)
    .then((result)=> {

      let user = result.user;

      console.log(user);
      this.navCtrl.pop();
    }).catch((error) =>{
        this.alerta('error al iniciar sesion');
    });
  }

    /// funcion alerta

    alerta(title){
      let alert = this.alert.create({
        title: title,
        buttons : [
          { text :'ok',
            role :'cancel'
          }
        ]
      })
      alert.present();
    }


// crud realtime

 /* addItem(item){
    if(item !== undefined && item !== null){
      let newItem = this.realtime.push();
      newItem.set(item);
      this.name = '';
      this.last = '';
    }
  }

  eliminarItem(key){
    let alert = this.alert.create({
      title: '¿seguro deseas eliminar este item?',
      buttons:[
        {
          text :'cancel',
          role :'cancel'
        },
        {
          text:'eliminar',
          handler : data =>{
            this.deleteItem(key);
          }
        }
      ]
    })
    alert.present();
  }

  async deleteItem(key){
    firebase.database().ref('mensaje/'+key).remove();
  }

  editItem(key){
    const prompt = this.alert.create({
      title: 'Edit item',
      
      inputs:[
        {
          name : 'name',
          placeholder: 'Name'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role:'cancel'
        },
        {
          text: 'edit', 
          handler: data => {
            if(data.name!== undefined && data.name.length > 0){
              firebase.database().ref('mensaje/'+key).update({
                name: data.name
              })
            }
          }
        }
      ]
    });
    prompt.present();
  } */


  // crud firestore cloud
 /* getItems(){
    this.cloud.collection('users').onSnapshot((query)=>{
      query.forEach((doc)=>{
        this.items_cloud.push(doc);
        console.log(`${doc.id} => ${doc.data().email}`);
      })
    })

    
  }

  add(item){
    this.cloud.collection("users").add({
      email: item.email,
      username: item.username,
      pass: item.pass
  })
  .then(function(docRef) {
      console.log("Document written with ID: ", docRef.id);
      
  })
  .catch(function(error) {
      console.error("Error adding document: ", error);
  });
    this.username = '';
    this.email = '';
    this.pass = ''
  }

  deleteItems(itemId){
      this.cloud.collection("users").doc(itemId).delete().then(function() {
        console.log("Document successfully deleted!");
      }).catch(function(error) {
        console.error("Error removing document: ", error);
      });
  }*/

  ///  aut correo y pass

 /* registrar(item){
    this.aut.createUserWithEmailAndPassword(item.correo,item.contrasena).
    then(()=>{
      let mensaje = 'usuario creado correctamente';
      this.alerta(mensaje);
    })
    .catch((error)=> {
      let errorMessage = error.message;  
      this.alerta(errorMessage);
    });

    this.correo = '';
    this.contrasena = '';
  }

  iniciar(item){
    this.aut.signInWithEmailAndPassword(item.correo, item.contrasena)
    .then(()=>{
      this.alerta('Bienvenido!!');
      this.correo = '';
      this.contrasena = '';
    })
    .catch((error)=> {
      let errorMessage = error.message;
      this.alerta(errorMessage);
    });
    this.contrasena= '';
  }

  
  observador(){  
    this.aut.onAuthStateChanged((user)=> {
        if (user) {
          // User is signed in.
          console.log(' hay usuarios activos')
          var displayName = user.displayName;
          var email = user.email;
          var emailVerified = user.emailVerified;
          var photoURL = user.photoURL;
          var isAnonymous = user.isAnonymous;
          var uid = user.uid;
          var providerData = user.providerData;
          // ...
        this.login = true;
        } else {
          // User is signed out.
          // ...
          console.log('no hay usuarios activos');
          this.login = false;
        }
    });
  }

  cerrar(){
    this.aut.signOut()
    .then(()=>{
      this.alerta('Gracias por Visitarnos');  
    })
    .catch((error)=>{
      this.alerta('Ha ocurrido un error'); 
    })
  }

*/

}
