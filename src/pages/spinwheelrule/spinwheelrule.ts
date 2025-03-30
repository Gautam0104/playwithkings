import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the SpinwheelrulePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-spinwheelrule',
  templateUrl: 'spinwheelrule.html',
})
export class SpinwheelrulePage {

  constructor(public navCtrl: NavController, public navParams: NavParams,private viewCtrl:ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SpinwheelrulePage');
  }
  closemodel()
  {
    this.viewCtrl.dismiss();

  }
}
