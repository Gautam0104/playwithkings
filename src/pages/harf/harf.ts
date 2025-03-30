import { Component, ViewChild } from "@angular/core";
import {
  IonicPage,
  ModalController,
  NavController,
  NavParams,
  Platform,
} from "ionic-angular";
import { ServicesProvider } from "../../providers/services/services";
import { NgxWheelComponent } from "ngx-wheel";
import { SpinwheelrulePage } from "../spinwheelrule/spinwheelrule";
import { BetpopupPage } from "../betpopup/betpopup";
import { BetoptionpopPage } from "../betoptionpop/betoptionpop";
import { WebviewPage } from "../webview/webview";
import { MyharfPage } from "../myharf/myharf";

/**
 * Generated class for the HarfPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-harf",
  templateUrl: "harf.html",
})
export class HarfPage {
  @ViewChild(NgxWheelComponent, {}) wheel;

  items: any = [
    {
      id: 0,
      text: "0",
      fillStyle: "#f3b11f",
      textFillStyle: "#ffffff",
      strokeStyle: "#f3b11f",
    },
    {
      id: 1,
      text: "1",
      fillStyle: "#5eaf9e",
      textFillStyle: "#ffffff",
      strokeStyle: "#5eaf9e",
    },
    {
      id: 2,
      text: "2",
      fillStyle: "#f33e4f",
      textFillStyle: "#ffffff",
      strokeStyle: "#f33e4f",
    },
    {
      id: 3,
      text: "3",
      fillStyle: "#796eb2",
      textFillStyle: "#ffffff",
      strokeStyle: "#796eb2",
    },
    {
      id: 4,
      text: "4",
      fillStyle: "#00FF00",
      textFillStyle: "#ffffff",
      strokeStyle: "#00FF00",
    },
    {
      id: 5,
      text: "5",
      fillStyle: "#1ca5c7",
      textFillStyle: "#ffffff",
      strokeStyle: "#1ca5c7",
    },
    {
      id: 6,
      text: "6",
      fillStyle: "#ff0000",
      textFillStyle: "#ffffff",
      strokeStyle: "#ff0000",
    },
    {
      id: 7,
      text: "7",
      fillStyle: "#FFA500",
      textFillStyle: "#ffffff",
      strokeStyle: "#FFA500",
    },
    {
      id: 8,
      text: "8",
      fillStyle: "#f94d27",
      textFillStyle: "#ffffff",
      strokeStyle: "#f94d27",
    },
    {
      id: 9,
      text: "9",
      fillStyle: "#800080",
      textFillStyle: "#ffffff",
      strokeStyle: "#800080",
    },
  ];

  mg_number_sets: any = [
    { ms_number: 0, amount: "", back: "#FFA500" },
    { ms_number: 1, amount: "", back: "#FFA500" },
    { ms_number: 2, amount: "", back: "#FFA500" },
    { ms_number: 3, amount: "", back: "#FFA500" },
    { ms_number: 4, amount: "", back: "#FFA500" },
    { ms_number: 5, amount: "", back: "#FFA500" },
    { ms_number: 6, amount: "", back: "#FFA500" },
    { ms_number: 7, amount: "", back: "#FFA500" },
    { ms_number: 8, amount: "", back: "#FFA500" },
    { ms_number: 9, amount: "", back: "#FFA500" },
  ];

  user_info: any = {};
  last5_result: any = [];
  selected_jantari: any = [];
  grand_total_for_jantari: any = 0;
  error_message: any = "";
  idToLandOndata: any;
  hidef: boolean = false;
  timer: any;
  maxTime: any = 0;
  hidevalue: boolean = false;
  actultime: any = "00:00";
  harf_id: any = 0;
  result_betamount = [];
  current_amount: any = 9;
  min_stack: any = 0;
  setError: any = "";

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private services: ServicesProvider,
    public plt: Platform,
    private modalCtrl: ModalController
  ) {
    this.idToLandOndata = 4;
    this.plt.ready().then(() => {
      this.plt.pause.subscribe(() => {
        console.log("****UserdashboardPage PAUSED****");
      });
      this.plt.resume.subscribe(() => {
        this.gethome(0);
      });
    });
  }

  openrule() {
    /* let profileModal = this.modalCtrl.create(SpinwheelrulePage, { fromd: 'cart'});
    profileModal.onDidDismiss(data => {
       ////this.navCtrl.setRoot(TabsPage);

   });
    profileModal.present(); */

    this.navCtrl.push(WebviewPage, {
      title: "Roulette Rules",
      url: "spin-game-rule",
    });
  }
  openoption() {
    let profileModal = this.modalCtrl.create(BetoptionpopPage, {
      fromd: "cart",
    });
    profileModal.onDidDismiss((data) => {
      ////this.navCtrl.setRoot(TabsPage);
    });
    profileModal.present();
  }
  openbetpop(c) {
    if (!this.hidevalue) {
      let profileModal = this.modalCtrl.create(BetpopupPage, { fromd: "cart" });
      profileModal.onDidDismiss((data) => {
        ////this.navCtrl.setRoot(TabsPage);
        console.log(data);
        if (data.cash_project != undefined && data.cash_project > 0) {
          this.mg_number_sets[c].amount = data.cash_project;
          this.grand_total_for_jantari = data.cash_project;
          this.placejantaribet();
        }
      });
      profileModal.present();
    }
  }
  ionViewWillEnter() {
    this.services.getuser().then((userloc) => {
      console.log(userloc, "userlac");

      if (userloc != null && userloc != undefined) {
        this.user_info = userloc;
        this.gethome(1);
      }
    });
  }
  ionViewWillLeave() {
    clearInterval(this.timer);
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad HarfPage");
  }
  before() {}

  setnumber() {
    this.setError = "";
    this.selected_jantari = [];
    this.grand_total_for_jantari = 0;
    this.mg_number_sets.forEach((item) => {
      if (item.amount != undefined && item.amount > 0) {
        this.selected_jantari.push(item);
        this.grand_total_for_jantari =
          this.grand_total_for_jantari + parseInt(item.amount);

        if (parseInt(item.amount) < parseInt(this.min_stack)) {
          this.setError =
            "Minimum Bet For Individual Number Must Be " + this.min_stack;
        }
      }
    });
  }

  gettimeformat(ti) {
    var minutes = Math.floor(ti / 60);
    var seconds = ti - minutes * 60;

    this.actultime =
      this.padLeadingZeros(minutes, 2) + ":" + this.padLeadingZeros(seconds, 2);
  }

  padLeadingZeros(num, size) {
    var s = num + "";
    while (s.length < size) s = "0" + s;
    return s;
  }

  StartTimer() {
    this.timer = setInterval(() => {
      if (this.maxTime <= 0) {
        this.gethome(1);
        return;
      }
      if (this.maxTime <= 30) {
        this.hidevalue = true;
      } else {
        this.hidevalue = false;
      }
      this.maxTime -= 1;
      if (this.maxTime > 0) {
        ///    this.hidevalue = false;
        this.gettimeformat(this.maxTime);
      } else {
        ////    this.hidevalue = true;
      }
    }, 1000);
  }

  getexposer(key) {
    let exposer: any = 0;
    let extramount: any = 0;
    this.result_betamount.forEach((element) => {
      if (element.h_number == key) {
        exposer = element.h_sum;
      } else {
        extramount = parseFloat(extramount) + parseFloat(element.h_sum);
      }
    });

    let extnew = -(extramount - (exposer * this.current_amount - exposer));

    return extnew.toFixed(2);
  }
  gethome(type) {
    //let loading:any =this.services._loader_content();
    ///loading.present();
    let credentials = { user_id: this.user_info.user_id };
    this.services.commonfunction(credentials, "dashboard/getharfdata").then(
      (result: any) => {
        if (result.message == "ok") {
          clearInterval(this.timer);
          this.current_amount = result.harfbhav;
          this.harf_id = result.harf_id;
          this.services.userbalancedata = result.balance;
          this.maxTime = result.difference;
          this.StartTimer();
          this.hidef = true;
          this.min_stack = result.min_stack;
          this.result_betamount = result.betamount;
          this.mg_number_sets.forEach((element, key) => {
            this.mg_number_sets[key]["exposer"] = this.getexposer(
              element.ms_number
            );
          });
          this.idToLandOndata = parseInt(result.last_result[0]);
          if (type == 1) {
            this.wheel.reset();

            setTimeout(() => {
              this.wheel.spin(this.idToLandOndata);
              setTimeout(() => {
                this.last5_result = result.last_result;
              }, 6000);
            }, 500);
          }

          new Promise((resolve) => setTimeout(resolve, 35)); // Wait here for one tick
        }
        //  loading.dismiss();
      },
      (err) => {
        console.log(err);
        /// loading.dismiss();
      }
    );
  }
  setnumberonzero() {
    let t: any = [];
    this.mg_number_sets.forEach((element) => {
      element["amount"] = "";
      t.push(element);
    });
    this.grand_total_for_jantari = 0;
    return t;
  }
  openhistory() {
    this.navCtrl.push(MyharfPage);
  }
  placejantaribet() {
    this.setnumber();
    if (this.grand_total_for_jantari <= 0) {
      this.error_message = "Please Enter Amount";
      this.services.presentToast(this.error_message);
      return false;
    }
    if (this.setError != "") {
      this.error_message = this.setError;
      this.services.presentToast(this.error_message);
      return false;
    }

    if (this.services.userbalancedata >= this.grand_total_for_jantari) {
      this.submitbet();
    } else {
      this.error_message = "Your balance is low please recharge your wallet";
      this.services.presentToast(this.error_message);
      return false;
    }
  }
  submitbet() {
    let loading: any = this.services._loader_content();
    loading.present();
    let credentials = {
      user_id: this.user_info.user_id,
      mg_number_sets: this.mg_number_sets,
      harf_id: this.harf_id,
    };
    this.services.commonfunction(credentials, "dashboard/placehrfbet").then(
      (result: any) => {
        if (result.message == "ok") {
          this.services.presentToast("Place bet Successfully");
          this.setnumberonzero();
          this.gethome(0);
        }
        loading.dismiss();
      },
      (err) => {
        console.log(err);
        loading.dismiss();
      }
    );
  }
  after() {}
}
