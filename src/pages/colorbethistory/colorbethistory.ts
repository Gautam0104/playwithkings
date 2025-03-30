import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ServicesProvider } from '../../providers/services/services';

/**
 * Generated class for the ColorbethistoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-colorbethistory',
  templateUrl: 'colorbethistory.html',
})
export class ColorbethistoryPage {
  
  houses:any={};
  user_info:any={};
  coursed:any=[];
  constructor(public navCtrl: NavController, public navParams: NavParams,private services:ServicesProvider) {
     this.services.getuser().then((userloc)=>{
      console.log(userloc,"userlac");

            if(userloc != null && userloc != undefined ) {
              this.user_info =userloc;
              this.getWallet();
             }     
        });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WinninglistPage');
  }
  getWallet()
  {
   let loading:any = this.services._loader_content();
   loading.present();

  let data ={user_id:this.user_info.user_id};
    this.services.commonfunction(data,'color/getcolorbet').then((result: any) => {
          if(result.message=='ok'){
          
          this.coursed = result.result;
        
       }      
       loading.dismiss();

    },(error)=>{
      loading.dismiss();
     });
  }


}
