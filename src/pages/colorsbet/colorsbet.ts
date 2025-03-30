import { Component } from '@angular/core';
import { App, IonicPage, ModalController, NavController, NavParams, Platform } from 'ionic-angular';
import { ServicesProvider } from '../../providers/services/services';
import { AddcashPage } from '../addcash/addcash';
import { AddpromocodePage } from '../addpromocode/addpromocode';
import { ViewmorecolorsPage } from '../viewmorecolors/viewmorecolors';
import { WebviewPage } from '../webview/webview';
import { WalletPage } from '../wallet/wallet';

/**
 * Generated class for the ColorsbetPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-colorsbet',
  templateUrl: 'colorsbet.html',
})
export class ColorsbetPage {

  activetabs:any='all';
  user_info:any={};
  hidef:boolean=false;
  data:any={};
  timer_data:any;
  timerc_list:any;
  furturetime:any;
  datamine:any=[];
  dataresult:any=[];
  avail_balance:any=0.00;
  blockstatus:any=0;
  minute:any=0;
  second:any=0;
  profileModal:any;
  balance:any=0;
  maxTime:any=0;
  hidevalue:boolean=false;
  actultime:any='00:00';
  ratesetting:any={};
  category:any={type:3};
  min_stack:any=10;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private services:ServicesProvider,private plt:Platform,
    private modalCtrl:ModalController,private app:App) {
    

              this.plt.ready().then(() => {
                this.plt.pause.subscribe(() => {        
                    console.log('****UserdashboardPage PAUSED****');
                });  
                this.plt.resume.subscribe(() => {      
                  this.gethome(0);
                });
               });
               /*this.services.getuser().then((userloc)=>{
                console.log(userloc,"userlac");
                         this.user_info =userloc;
                         this.gethome();
                        });*/
  }

  getresultdata(result)
  {
    let d:any='';
    if(result.period_status=="FINISHED" && this.actultime<=5 || result.period_status=="FINISHED" && this.data.period_number!=result.period_number) 
    {
    if(this.category.type==0)
    {
      d=result.preiod_a_result;
    }else if(this.category.type==1)
    {
      d=result.preiod_b_result;
    }else if(this.category.type==2)
    {
      d=result.preiod_c_result;
    }else if(this.category.type==3)
    {
      d=result.preiod_d_result;
    }
  }
    return d;
  }
  getcolorresult(result)
  {

    let d:any='';
    if(result.period_status=="FINISHED")
{
    if(this.category.type==0)
    {
      d=result.preiod_a_result;
    }else if(this.category.type==1)
    {
      d=result.preiod_b_result;
    }else if(this.category.type==2)
    {
      d=result.preiod_c_result;
    }else if(this.category.type==3)
    {
      d=result.preiod_d_result;
    }
  }
let htmld:any="";
if(result.period_status=="FINISHED" && this.actultime<=5 || result.period_status=="FINISHED" && this.data.period_number!=result.period_number) 
{
if(d==0)
{
  htmld ='<span class="tx-red mr-5"><img src="assets/icon/red.png" class="wd-16"></span><span class="tx-voilet"><img src="assets/icon/purple.png" class="wd-16"></span>';
}else if(d==5)
{
  htmld ='<span class="tx-green mr-5"><img src="assets/icon/greenc.png" class="wd-16"></span><span class="tx-voilet"><img src="assets/icon/purple.png" class="wd-16"></span>';
}else if(d==2 || d==4 || d==6 || d==8)
{
  htmld ='<span class="tx-red"><img src="assets/icon/red.png" class="wd-16"></span>';
}else if(d==1 || d==3 || d==7 || d==9)
{
  htmld ='<span class="tx-red"><img src="assets/icon/greenc.png" class="wd-16"></span>';
}
}
    return htmld;
  }
  ionViewWillLeave()
  {
    clearInterval(this.timer_data);
  }

  ionViewWillEnter()
  {
    this.services.getuser().then((userloc)=>{
      console.log(userloc,"userlac");

            if(userloc != null && userloc != undefined ) {
              this.user_info =userloc;
             this.gethome(0);
            }
          });
  }

  settabs(t)
  {
    this.activetabs=t;
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad BetlistPage');
  }
  
  addcash()
  {
    this.navCtrl.push(AddcashPage);
  }

  openterms(){
    this.navCtrl.push(WebviewPage,{title:'Color Game Rules',url:"color-game-rule"});
  }
  viewmore()
  {
    this.navCtrl.push(ViewmorecolorsPage);
  }
  gethome(type)
  {
    let loading:any;
    if(type==1)
    {
      loading = this.services._loader_content();
      loading.present();
    }
    let credentials = {user_id:this.user_info.user_id};  
    this.services.commonfunction(credentials,'color/loaddetail').then((result: any) => {
      if(type==1)
      {
      loading.dismiss();
      }
      this.hidef =true;
      clearInterval(this.timer_data);

    if(result.status==1)
    {
      this.balance =result.balance;
      this.avail_balance =result.data.wallet_amount;
      this.data =result.data; 
      this.min_stack =result.min_stack; 
      if(result.difference>0)
      {
        this.maxTime = result.difference;
        this.StartTimer();
        ///this.getmyresult();
        this.getresult();
      }else{
        this.gethome(0);
      }
     

    }

    }, (err) => {
  console.log(err);
  if(type==1)
      {
        loading.dismiss();

      }
      this.hidef =true;

    });	 
  }
  getresult()
  {
  
    let credentials = {user_id:this.user_info.user_id,bet_type_cat:this.category.type};  
    this.services.commonfunction(credentials,'color/resulthistory').then((result: any) => {
   /// this.hidef =true;
    if(result.status==1)
    {
      this.datamine =result.listmine;
      this.dataresult =result.list;

    }
    }, (err) => {
    console.log(err);
 ///   this.hidef =true;
    });	 
  }
  


  padLeadingZeros(num, size) {
    var s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
}
  gettimeformat(ti)
  {
    var minutes = Math.floor(ti / 60);
    var seconds = ti - minutes * 60;
    this.actultime =this.padLeadingZeros(minutes,2)+':'+this.padLeadingZeros(seconds,2);
  }
  getexposer(d)
  {
    return 0;
  }
  StartTimer(){

    this.timer_data = setInterval(()=>{

      if(this.maxTime == 0) { this.gethome(0);     return;     }
      if(this.maxTime <= 30) {                this.hidevalue = true;          }else{    this.hidevalue = false;        }
      this.maxTime -= 1;
      if(this.maxTime>0){
    ///    this.hidevalue = false;
        this.gettimeformat(this.maxTime);
      }
      else{
 ////    this.hidevalue = true;
         }
    },1000); 
  }
 
  

  joinnow(color,number)
  {
    if(!this.hidevalue)
    {

       let type='COLOUR';
      if(color=='')
      {
        type ='NUMBER';
      }
      this.profileModal = this.modalCtrl.create(AddpromocodePage,{color:color,number:number,min_stack:this.min_stack});
      this.profileModal.onDidDismiss(data => {

        if(data.closed==1)
        {
          if(this.balance>=data.contract_money)
          {
            if(type=='NUMBER')
            {
              this.setdata(data.contract_money,data.numberd,type,number);
  
            }else{
              this.setdata(data.contract_money,data.numberd,type,color);
            }
          }else{
            this.services.presentToast("Low balance");
          }
         
        }
     });
     this.profileModal.present(); 
    }else{
      this.services.presentToast("This game is closed please wait for next round");
    }
  }
  setdata(contract_money,numberd,type,batting_type_value)
  {
   
    ///alert("test");
  
    let loading:any=this.services._loader_content();
    loading.present();
    let credentials = {user_id:this.user_info.user_id,batting_amount:contract_money,
      batting_type_value:batting_type_value,bet_type_cat:this.category.type,
      period_id:this.data.period_id,batting_type:type};  
    this.services.commonfunction(credentials,'color/createbat').then((result: any) => {
      loading.dismiss();
    if(result.status==1)
    {
      this.ratesetting=result.ratesetting;
     this.avail_balance = result.wallet_amount;
     this.balance = result.wallet_amount;
     this.getresult();
     this.services.presentToast(result.message);
    }else{
      this.services.presentToast(result.message);
    }
    }, (err) => {
      loading.dismiss();
  console.log(err);
    });	 
  }
openwallet()
  {
    this.app.getRootNav().push(WalletPage);
  }
   openterm(){
    this.app.getRootNav().push(WebviewPage,{title:'Color Game Rules',url:"color-rules"});
  } 
}
