import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import moment from 'moment';
import { ServicesProvider } from '../../providers/services/services';

/**
 * Generated class for the LeveluserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-leveluser',
  templateUrl: 'leveluser.html',
})
export class LeveluserPage {
level:any={};
userInfo:any={};
hidef:boolean=false;
userdata:any=[];
  constructor(public navCtrl: NavController, public navParams: NavParams,private services:ServicesProvider) {
    this.level =this.navParams.get("level");
    this.services.getuser().then((user) => {
      this.userInfo = user; 
      this.getuser();
     }); 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LeveluserPage');
  }

  getuser()
  {
 
 	let data ={user_id:this.userInfo.user_id,level:this.level};
    this.services.commonfunction(data,"dashboard/getfirstleveluser").then((result: any) => {
 this.hidef =true;
      console.log('result',result);
      if(result.message!=undefined){
        if(result.message=='ok'){
          
           this.userdata= result.result;
         }
      }      
    },(error)=>{
      this.hidef =true;
    });
  }
  changedateformat(dated)
  {
    return moment(dated).format('DD,MMM YYYY');
    
  }
  changetimeformat(dated)
  {
    return moment(dated).format('HH:MM');
    
  }
}
