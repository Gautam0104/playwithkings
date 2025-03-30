import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ServicesProvider } from '../../providers/services/services';
import * as moment from 'moment';
import { LeveluserPage } from '../leveluser/leveluser';

/**
 * Generated class for the StatementPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-statement',
  templateUrl: 'statement.html',
})
export class StatementPage {
  userInfo:any={};
  hidef:boolean=false;
  wallethistory:any=[];
  activetabs:any="level1";
  all_data:any={};
  constructor(public navCtrl: NavController, public navParams: NavParams,private services:ServicesProvider) {
    this.services.getuser().then((user) => {
      this.userInfo = user; 
      this.getWallet();
     }); 
  }
  settabs(d)
  {
    this.activetabs=d;
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad StatementPage');
  }
  getWallet()
  {
 
 	let data ={user_id:this.userInfo.user_id};
    this.services.commonfunction(data,"dashboard/getcommissionhistroy").then((result: any) => {
 this.hidef =true;
      console.log('result',result);
      if(result.message!=undefined){
        if(result.message=='ok'){
          
           this.wallethistory= result.result;
           this.all_data =result;
         }
      }      
    },(error)=>{
      this.hidef =true;
    });
  }
  openlevel(t)
  {
    this.navCtrl.push(LeveluserPage,{level:t});
  }
  changedateformat(dated)
  {
    return moment(dated).format('DD,MMM YYYY');
    
  }
  changetimeformat(dated)
  {
    var r = dated.replace("+05:30","");
    var rr  =r.replace("T"," ");
    return moment(rr).format('hh:mm A');
    
  }
}
