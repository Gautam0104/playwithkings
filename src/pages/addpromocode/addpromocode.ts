import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { ServicesProvider } from '../../providers/services/services';

/**
 * Generated class for the AddpromocodePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-addpromocode',
  templateUrl: 'addpromocode.html',
})
export class AddpromocodePage {
color:any='';
number:any=1;
contract_money:any=10;
numberd:number=1;
user_info:any={};
bet_options:any=[10,20,50,70,100,500,1000,5000,10000];
error_messge:any="";
min_stack:any=10;
  constructor(public navCtrl: NavController, public navParams: NavParams,private services:ServicesProvider,
    private viewCtrl:ViewController) {
    this.color =this.navParams.get('color');
    this.number =this.navParams.get('number');
    this.min_stack =this.navParams.get("min_stack");
    this.services.getuser().then((user)=>{
      console.log(user);
      if(user!=null)
      {
        this.user_info = user;
       }
    });   

    this.services.getbetamount().then((userloc)=>{
      console.log(userloc,"userlac");

            if(userloc != null && userloc != undefined ) {
              this.bet_options =userloc;
              console.log(this.bet_options,"this.bet_options");
            }
          });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad AddpromocodePage');
  }
  closepage(closed){
    if(closed==1)
    {
      if(this.contract_money<=0)
      {
        this.error_messge ="Please Enter Amount";
        return false;
      }
  
      if(parseInt(this.contract_money)<parseInt(this.min_stack))
      {
        this.error_messge ="Bet Amount Should be "+this.min_stack;
        return false;
      }

      if(this.contract_money%10!=0)
      {
        ///this.error_messge ="Please Enter Amount Multiple of 10";
        ///return false;
      }


    }
    this.viewCtrl.dismiss({contract_money:this.contract_money,numberd:this.numberd,closed:closed});
  }
  selectcash(c)
  {
   this.contract_money =c;
  }
}
