import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ServicesProvider } from '../../providers/services/services';
import { WinninglistPage } from '../winninglist/winninglist';

/**
 * Generated class for the MywinsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mywins',
  templateUrl: 'mywins.html',
})
export class MywinsPage {
  user_info:any={};
  hidef:boolean=false;
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
  showdata(wallet)
  {
this.navCtrl.push(WinninglistPage,{houses:wallet});

  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad MywinsPage');
  }
  getWallet()
  {
   
  let data ={student_id:this.user_info.user_id};
    this.services.commonfunction(data,'dashboard/gethouses').then((result: any) => {
      this.hidef=true;
         if(result.message=='ok'){
          
          this.coursed = result.result;
        
       }      
    },(error)=>{
      this.hidef=true;
    });
  }
}
