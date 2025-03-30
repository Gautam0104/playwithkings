import { Component } from '@angular/core';
import { App, IonicPage, NavController, NavParams } from 'ionic-angular';
import moment from 'moment';
import { ServicesProvider } from '../../providers/services/services';
import { ColorsbetPage } from '../colorsbet/colorsbet';

/**
 * Generated class for the ChoosecolortypePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-choosecolortype',
  templateUrl: 'choosecolortype.html',
})
export class ChoosecolortypePage {
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
      this.app.getRootNav().push(ColorsbetPage,{houses:w});
   }
  
  doRefresh(ev)
  {
    this.hidef=false;
    this.getWallet();
    ev.complete();
  }
  
  
  getWallet()
      {
		  let loading:any=this.services._loader_content();
		  loading.present();
      let data ={user_id:this.user_data.user_id};
        this.services.commonfunction(data,'color/getcolors').then((result: any) => {
          this.hidef=true;
             if(result.message=='ok'){   

              this.balance =result.balance;
              this.coursed = result.result; 
           } 
		  loading.dismiss();
		   
        },(error)=>{
          this.hidef=true;
      		  loading.dismiss();
  });
      }
  
  

}
