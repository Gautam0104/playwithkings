import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ViewController,
} from "ionic-angular";
import { ServicesProvider } from "../../providers/services/services";

/**
 * Generated class for the BetoptionpopPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-betoptionpop",
  templateUrl: "betoptionpop.html",
})
export class BetoptionpopPage {
  aryoption: any = [10, 20, 50, 70, 100, 500, 1000, 5000, 10000];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private services: ServicesProvider,
    private viewCtrl: ViewController
  ) {
    this.services.getbetamount().then((userloc) => {
      console.log(userloc, "userlac");
      if (userloc != null && userloc != undefined) {
        this.aryoption = userloc;
        console.log(this.aryoption, "this.bet_options");
      }
    });
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad BetoptionpopPage");
  }

  onSaveBooking() {
    this.services.savebetmount(this.aryoption);
    this.viewCtrl.dismiss();
  }

  closemodel() {
    this.viewCtrl.dismiss();
  }
}
