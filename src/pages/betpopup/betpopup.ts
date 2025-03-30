import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { ServicesProvider } from '../../providers/services/services';

/**
 * Generated class for the BetpopupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-betpopup',
  templateUrl: 'betpopup.html',
})
export class BetpopupPage {
  cash_project:any="";
  bet_options:any=[10,20,50,70,100,500,1000,5000,10000];
  error_message:any="";
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private services:ServicesProvider,private viewCtrl:ViewController) {
    this.services.getbetamount().then((userloc)=>{
      console.log(userloc,"userlac");

            if(userloc != null && userloc != undefined ) {
              this.bet_options =userloc;
              console.log(this.bet_options,"this.bet_options");
            }
          });
  }
  selectcash(d)
  {
    this.cash_project=d;

  }
  closemodel()
  {
    this.viewCtrl.dismiss({cash_project:0});
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad BetpopupPage');
  }
  onSaveBooking()
  {
    if(this.cash_project<=0)
    {
      this.error_message ="Please Enter Bet Amount";
      return false;
    }
    // if(this.cash_project%10!=0)
    // {
    //   this.error_message ="Please Enter Bet Amount Multiple of 10";
    //   return false;
    // }
    this.viewCtrl.dismiss({cash_project:this.cash_project});
  }

}
