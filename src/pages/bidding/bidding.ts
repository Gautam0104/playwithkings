import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import moment from "moment";
import { ServicesProvider } from "../../providers/services/services";
import { MywinninglistPage } from "../mywinninglist/mywinninglist";

/**
 * Generated class for the BiddingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-bidding",
  templateUrl: "bidding.html",
})
export class BiddingPage {
  activetabs: any = "all";
  hidef: boolean = false;
  coursed: any = [];
  img_url: any = "";
  user_data: any = {};
  exam: any = [];
  freetest: any = [];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private services: ServicesProvider
  ) {
    this.services.getuser().then((user) => {
      this.user_data = user;
      this.getWallet();
    });
  }
  ionViewWillEnter() {
    this.services.active_page = "TestSeries";
  }
  ionViewDidLoad() {
    console.log("ionViewDidLoad TestseriesPage");
  }
  opencommingsoon() {}
  getdata(getDate) {
    var check = moment(getDate).isAfter();
    console.log(getDate, check);
    return check;
  }

  doRefresh(ev) {
    this.hidef = false;
    this.getWallet();
    ev.complete();
  }

  oepnbiding(wallet) {
    this.navCtrl.push(MywinninglistPage, { houses: wallet });
  }
  getWallet() {
    let data = { student_id: this.user_data.student_id };
    this.services.commonfunction(data, "dashboard/gethouses").then(
      (result: any) => {
        this.hidef = true;
        if (result.message == "ok") {
          this.coursed = result.result;
        }
      },
      (error) => {
        this.hidef = true;
      }
    );
  }
}
