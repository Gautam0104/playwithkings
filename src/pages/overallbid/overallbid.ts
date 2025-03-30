import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BiddingPage } from '../bidding/bidding';
import { ColorbethistoryPage } from '../colorbethistory/colorbethistory';
import { MyharfPage } from '../myharf/myharf';

/**
 * Generated class for the OverallbidPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-overallbid',
  templateUrl: 'overallbid.html',
})
export class OverallbidPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OverallbidPage');
  }
  openlottery()
  {
    this.navCtrl.push(BiddingPage);
  }
  openbidding()
  {
    this.navCtrl.push(ColorbethistoryPage);
  }
  openharf()
  {
    this.navCtrl.push(MyharfPage);
  }
}

