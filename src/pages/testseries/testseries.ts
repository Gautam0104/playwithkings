import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { ServicesProvider } from '../../providers/services/services';
import moment from 'moment';
import { PlacebetPage } from '../placebet/placebet';
import { WebviewPage } from '../webview/webview';
import { WalletPage } from '../wallet/wallet';
/**
 * Generated class for the TestseriesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-testseries',
  templateUrl: 'testseries.html',
})
export class TestseriesPage {
activetabs:any='all';
hidef:boolean=false;
coursed:any=[];
img_url:any='';
user_data:any={};
exam:any=[];
freetest:any=[];
balance:any=0;
   constructor(public navCtrl: NavController, public navParams: NavParams,private app:App,private services:ServicesProvider) {
    
  }
  openterm(){
    this.navCtrl.push(WebviewPage,{title:'Lottery Game Rules',url:"matka-rules"});
  }
  ionViewWillEnter()
  {
    this.services.getuser().then((user) => {
      this.user_data = user; 
      this.getWallet();
     });  
       }
  ionViewDidLoad() {
    console.log('ionViewDidLoad TestseriesPage');
  }
  opencommingsoon()
  {

    
  }
  getdata(getDate)
  {
       var check = moment(getDate).isAfter();
        console.log(getDate, check);
      return check;
  }


settabs(d)
{
this.activetabs =d;
}
opendata(w)
 {
   if(w.status==1)
   {
    this.app.getRootNav().push(PlacebetPage,{houses:w});

   }else{
     this.services.presentToast("this game is closed");
   }
 }

doRefresh(ev)
{
  this.hidef=false;
  this.getWallet();
  ev.complete();
}

openwallet()
  {

    this.app.getActiveNav().push(WalletPage);

  }
getWallet()
    {
     
    let data ={student_id:this.user_data.user_id};
      this.services.commonfunction(data,'dashboard/gethouses').then((result: any) => {
        this.hidef=true;
           if(result.message=='ok'){
            
            this.coursed = result.result && result.result.length>0?result.result:[];
            this.balance =result.balance!==undefined?result.balance:0;
          
         }      
      },(error)=>{
        this.hidef=true;
      });
    }


}
