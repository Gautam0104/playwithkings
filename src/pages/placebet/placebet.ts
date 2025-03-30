import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ServicesProvider } from '../../providers/services/services';
import { MywinninglistPage } from '../mywinninglist/mywinninglist';
import { TabsPage } from '../tabs/tabs';
import { WalletPage } from '../wallet/wallet';
import { WebviewPage } from '../webview/webview';

/**
 * Generated class for the PlacebetPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-placebet',
  templateUrl: 'placebet.html',
})
export class PlacebetPage {
houses:any={};
activetabs:any='JANTARI';
grand_total:any="0";
openbetamount:any="";
openbetnumber:any="";
error_message:any='';
jantaridata:any=[];
credential:any={};
user_balance:any=0;
user_info:any={};
jantaritotal:any=0;
grand_total_for_jantari:any=0;
selected_jantari:any=[];
min_stack:any=10;
setError:any="";
  constructor(public navCtrl: NavController, public navParams: NavParams,private services:ServicesProvider) {
    this.houses =this.navParams.get('houses');
    this.services.getuser().then((userloc)=>{
      console.log(userloc,"userlac");

            if(userloc != null && userloc != undefined ) {
              this.user_info =userloc;
              this.getWallet();
             }     
        });
  }
  openterm(){
    this.navCtrl.push(WebviewPage,{title:'Lottery Game Rules',url:"matka-rules"});
  }
  settabs(d)
  {
  this.activetabs =d;
  }
  openhistory()
  {
    this.navCtrl.push(MywinninglistPage,{houses:this.houses})
  }
  openwallet()
  {

    this.navCtrl.push(WalletPage);

  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad PlacebetPage');
  }
  setamount()
  {
  this.grand_total =this.openbetamount;  
  }
  placeopenbet()
  {
    if(this.openbetnumber=='')
    {
      this.error_message ='Please Enter Number';
      return false;
    }
    if(this.openbetnumber.length<=1 || this.openbetnumber.length>2)
    {
      this.error_message ='Please Enter Correct Number like 01,02,03';
      return false;
    }

    if(this.openbetamount<=0)
    {
      this.error_message ='Please Enter Amount';
      return false;
    }



   if(this.user_balance>=this.openbetamount)
   {

    this.placebet(11,this.openbetnumber,this.openbetamount);
   }else{
    this.error_message ='Your balance is low please recharge your wallet';
    return false;
   }

  }

  placebet(type_id,nuumber,amount)
  {

    let loading = this.services._loader_content();
    loading.present();
  let data ={house_id:this.houses.mf_id,user_id:this.user_info.user_id,type_id:type_id,nuumber:nuumber,amount:amount};
    this.services.commonfunction(data,'dashboard/placebetcrossing').then((result: any) => {
      loading.dismiss();   
      if(result.message=='ok'){
          
        this.services.presentToast(result.notification);
        this.navCtrl.setRoot(TabsPage);
       } else{

        this.services.presentToast(result.notification);
       }     
    },(error)=>{
      loading.dismiss();
     });
  }

  placejantaribet()
  {
    this.setnumber();
    if(this.grand_total_for_jantari<=0)
    {
      this.error_message ='Please Enter Amount';
      return false;
    }

    if(this.setError!='')
    {
      this.error_message =this.setError;
      return false;
    }
     
   if(this.user_balance>=this.grand_total_for_jantari)
   {

    this.placebetjantari();
   }else{
    this.error_message ='Your balance is low please recharge your wallet';
    return false;
   }
    
  }


  placebetjantari()
  {

    let loading = this.services._loader_content();
    loading.present();
  let data ={house_id:this.houses.mf_id,user_id:this.user_info.user_id,amount:this.grand_total_for_jantari,jantaridata:this.selected_jantari};
 console.log(data,"data");
  this.services.commonfunction(data,'dashboard/placebetjantari').then((result: any) => {
      loading.dismiss();   
      if(result.message=='ok'){
          
      this.services.presentToast(result.notification);
    this.navCtrl.setRoot(TabsPage);
       } else{

        this.services.presentToast(result.notification);
       }     
    },(error)=>{
      loading.dismiss();
     });
  }
  setnumber()
  {
    this.setError="";
    this.selected_jantari =[];
 this.grand_total_for_jantari=0;
this.jantaridata.forEach((element) => {
  element.mg_number_sets.forEach((item) => {
    if(item.amount!=undefined && item.amount>0)
    {
      this.selected_jantari.push(item);
      this.grand_total_for_jantari =this.grand_total_for_jantari+parseInt(item.amount);
      if(parseInt(item.amount)<parseInt(this.min_stack))
      {
        this.setError ="Minimum Bet For Individual Number Must Be "+this.min_stack;
      }
    }
  });
});
    }
getWallet()
{
 
  let loading = this.services._loader_content();
  loading.present();
let data ={house_id:this.houses.mf_id,user_id:this.user_info.user_id};
  this.services.commonfunction(data,'dashboard/gethousewisedata').then((result: any) => {
    loading.dismiss();   
    if(result.message=='ok'){
        
       this.jantaridata = result.results;
       this.user_balance =result.current_balance;
       this.min_stack =result.min_stack;
     }      
  },(error)=>{
    loading.dismiss();
   });
}

}
