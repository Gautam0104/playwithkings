import { Component } from '@angular/core';
import { App, IonicPage, NavController, NavParams } from 'ionic-angular';
import { ServicesProvider } from '../../providers/services/services';
import * as moment from 'moment';
import { AddcashPage } from '../addcash/addcash';
import { WithdrawrequestPage } from '../withdrawrequest/withdrawrequest';
import { WebviewPage } from '../webview/webview';

/**
 * Generated class for the WalletPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-wallet',
  templateUrl: 'wallet.html',
})
export class WalletPage {
hidef:boolean=false;
walletbalance:any=0;
wallethistory:any=[];
userInfo:any={};
user_reffer_balance:any=0;
image_one:any="";
image_two:any="";
    constructor(public navCtrl: NavController, public navParams: NavParams,private services:ServicesProvider,
      private app:App) {
      
  }
ionViewWillEnter()
{
  this.services.getuser().then((user) => {
    this.userInfo = user; 
    this.getWallet();
   }); 
}
openterm(){
  this.navCtrl.push(WebviewPage,{title:'Wallet Guide',url:"wallet-guide"});
}
  ionViewDidLoad() {
    console.log('ionViewDidLoad WalletPage');
  }
  getWallet()
  {
 
 	let data ={user_id:this.userInfo.user_id};
    this.services.commonfunction(data,"dashboard/thistory").then((result: any) => {
 this.hidef =true;
      console.log('result',result);
      if(result.message!=undefined){
        if(result.message=='ok'){
          
          this.walletbalance = result.user_balance;
           this.wallethistory= result.result;
           this.user_reffer_balance=result.user_reffer_balance;
           this.image_one =result.banne_1;
           this.image_two =result.banner_2;
          }
      }      
    },(error)=>{
      this.hidef =true;
    });
  }

  addcash()
  {
    this.app.getRootNav().push(AddcashPage,{result_data:{balance:this.walletbalance}});
  }
  withdraw()
  {
    this.app.getRootNav().push(WithdrawrequestPage,{result_data:{balance:this.walletbalance}});
  }
  changedateformat(dated)
  {
    return moment(dated).format('DD,MMM YYYY');
    
  }
  changetimeformat(dated)
  {
    return moment(dated).format('hh:mm A');
    
  }
}
