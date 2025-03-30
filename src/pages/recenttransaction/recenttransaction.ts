import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import moment from "moment";
import { ServicesProvider } from "../../providers/services/services";

/**
 * Generated class for the RecenttransactionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-recenttransaction",
  templateUrl: "recenttransaction.html",
})
export class RecenttransactionPage {
  hidef: boolean = false;
  walletbalance: any = 0;
  wallethistory: any = [];
  userInfo: any = {};
  user_reffer_balance: any = 0;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private services: ServicesProvider
  ) {}

  ionViewWillEnter() {
    this.services.getuser().then((user) => {
      this.userInfo = user;
      this.getWallet();
    });
  }
  ionViewDidLoad() {
    console.log("ionViewDidLoad WalletPage");
  }
  getWallet() {
    let data = { user_id: this.userInfo.user_id };
    this.services.commonfunction(data, "dashboard/thistory").then(
      (result: any) => {
        this.hidef = true;
        console.log("result", result);
        if (result.message != undefined) {
          if (result.message == "ok") {
            this.walletbalance = result.user_balance;
            this.wallethistory = result.result;
            this.user_reffer_balance = result.user_reffer_balance;
          }
        }
      },
      (error) => {
        this.hidef = true;
      }
    );
  }

  changedateformat(dated) {
    return moment(dated).format("DD,MMM YYYY");
  }
  changetimeformat(dated) {
    return moment(dated).format("hh:mm A");
  }
}
