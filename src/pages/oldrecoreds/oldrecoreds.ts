import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import moment from "moment";
import { ServicesProvider } from "../../providers/services/services";
import { OldrecordelistPage } from "../oldrecordelist/oldrecordelist";

/**
 * Generated class for the OldrecoredsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-oldrecoreds",
  templateUrl: "oldrecoreds.html",
})
export class OldrecoredsPage {
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
  opendata(wallet) {
    this.navCtrl.push(OldrecordelistPage, { houses: wallet });
  }
  getdata(getDate) {
    var check = moment(getDate).isAfter();
    console.log(getDate, check);
    return check;
  }

  settabs(d) {
    this.activetabs = d;
  }

  openfile(file) {
    window.open(file);
  }

  doRefresh(ev) {
    this.hidef = false;
    this.getWallet();
    ev.complete();
  }

  getWallet() {
    let data = { student_id: this.user_data.user_id };
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
