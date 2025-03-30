import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ServicesProvider } from '../../providers/services/services';
import { SocialSharing } from '@ionic-native/social-sharing';
import { WebviewPage } from '../webview/webview';

/**
 * Generated class for the SharePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-share',
  templateUrl: 'share.html',
})
export class SharePage {
hidef:boolean=false;
user_data:any={};
user_sharescreenmessage:any='';
user_code:any='';
user_sharemessage:any='';
activetabs:any="level1";
all_data:any={};
  constructor(public navCtrl: NavController, public navParams: NavParams,private services:ServicesProvider,
    private socialSharing: SocialSharing) {
      this.services.getuser().then((user) => {
        this.user_data = user; 
        this.loadshareingdata();
       }); 
  }
  openterm(){
    this.navCtrl.push(WebviewPage,{title:'Refer & Earn',url:"refer-earn"});
  }
  settabs(d)
  {
    this.activetabs =d;
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad SharePage');
  }
  loadshareingdata()
  {
    
    let cred:any={user_id:this.user_data.user_id};
      this.services.commonfunction(cred,'register/sharetext').then((result: any) => {
       if(result.message=='ok')
    {
   
  
this.user_sharescreenmessage = 	result.text_share_screen;
this.user_code = 	result.user_share_code;
this.user_sharemessage = result.text_share_message;	

this.all_data =result;
      }
      this.hidef=true;
     }, (err) => {
    console.log(err);
    this.hidef=true;
  });	 

  }
  shareApp()
{
	 
     let loading =  this.services._loader_content();
loading.present();
      this.socialSharing.share(this.user_sharemessage, 'Quality Education').then(() => {
          // Sharing via email is possible
           loading.dismiss();
        }).catch(() => {
          // Sharing via email is not possible
         loading.dismiss();
        });
}

}
