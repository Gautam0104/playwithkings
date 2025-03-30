import { Component } from "@angular/core";
import {
  NavController,
  App,
  ModalController,
  Tabs,
  NavParams,
} from "ionic-angular";
import { NotificationPage } from "../notification/notification";
import { ServicesProvider } from "../../providers/services/services";
import { SharePage } from "../share/share";
import { OfferPage } from "../offer/offer";
import { FirebaseProvider } from "../../providers/firebase/firebase";

declare var window: any;
import { Device } from "@ionic-native/device";
import { SocialSharing } from "@ionic-native/social-sharing";
import { NewsPage } from "../news/news";
import { LoginPage } from "../login/login";
import { ColorsbetPage } from "../colorsbet/colorsbet";
import { ChoosecolortypePage } from "../choosecolortype/choosecolortype";
import { InAppBrowser } from "@ionic-native/in-app-browser";
import { IntroPage } from "../intro/intro";
import { WalletPage } from "../wallet/wallet";

@Component({
  selector: "page-home",
  templateUrl: "home.html",
})
export class HomePage {
  user_info: any = {};
  dashboard_data: any = {};
  hidef: boolean = false;
  userFirebaseToken: any = "";
  userDeviceId: any = "";
  userdeviceos: any = "";
  user_sharemessage: any = "";
  last_result: any = {};
  color_arry: any = [
    "#d51d5f",
    "#f7b702",
    "#02ccff",
    "#228B22",
    "#d51d5f",
    "#f7b702",
    "#02ccff",
    "#228B22",
    "#d51d5f",
    "#f7b702",
    "#02ccff",
    "#228B22",
    "#d51d5f",
    "#f7b702",
    "#02ccff",
    "#228B22",
  ];
  lastforresult: any = [];
  color_data: any = "#d51d5f";
  lastdashforresult: any = [];
  games: any = [];
  image_url: any = "";
  slider: any = [];
  private colorInterval: any;

  constructor(
    public navCtrl: NavController,
    private app: App,
    private services: ServicesProvider,
    private modalCtrl: ModalController,
    private tabs: Tabs,
    private device: Device,
    private navParams: NavParams,
    private socialSharing: SocialSharing,
    private inapp: InAppBrowser,
    private firebase: FirebaseProvider
  ) {
    this.services.getuser().then((userloc) => {
      if (userloc != null && userloc != undefined) {
        this.user_info = userloc;
        let objElement: any = this;
        if (objElement.device.platform == "Android") {
          // Get Firebase messaging token
          this.firebase.getMessagingToken().then((token) => {
            this.userFirebaseToken = token;
            this.userDeviceId = objElement.device.uuid;
            this.userdeviceos = objElement.device.platform;
          });

          // Listen for Firebase messages
          this.firebase.onMessage().subscribe((payload) => {
            console.log("Received message:", payload);
            // Handle the notification here
          });
        }
        this.gethome();
      }
    });
    this.democolor();
  }

  openpage(x) {
    if (x.games_id == 2) {
      this.tabs.select(2);
    } else if (x.games_id == 5) {
      this.tabs.select(1);
    } else if (x.games_id == 3) {
      this.opencolor();
    } else {
      this.inapp.create(
        this.services.whatsapp +
          "?text=Hi need cricket demo on your app. My maxwin registerd mobile number is" +
          this.user_info.user_mobile,
        "_system"
      );
    }
  }

  openaccount() {
    this.tabs.select(4);
  }
  opencolor() {
    this.app.getRootNav().push(ColorsbetPage, { houses: { type: 3 } });
  }
  openwallet() {
    this.app.getRootNav().push(WalletPage);
  }

  opennotification() {
    this.app.getRootNav().push(NotificationPage);
  }

  democolor() {
    this.colorInterval = setInterval(() => {
      let item =
        this.color_arry[Math.floor(Math.random() * this.color_arry.length)];
      this.color_data = item;
    }, 2000);
  }
  getlastfourdata(ary) {
    let k: any = [];
    let cnt = 0;
    ary.forEach((element) => {
      if (cnt != 0) {
        k.push(element);
      }
      cnt++;
    });
    return k;
  }
  ionViewWillEnter() {
    this.services.active_page = "Home";
  }
  ionViewWillLeave() {
    this.services.active_page = "Other";
  }
  doRefresh(ev) {
    this.gethome();
    ev.complete();
  }
  gethome() {
    if (this.userDeviceId == "") {
      this.userDeviceId = "WAP";
    }
    let device: any = this.device.uuid;
    if (this.device.uuid == undefined) {
      device = "WAP";
    }
    let credentials = {
      userFirebaseToken: this.userFirebaseToken,
      userDeviceId: device,
      userdeviceos: this.userdeviceos,
      user_id: this.user_info.user_id,
    };
    this.services.commonfunction(credentials, "dashboard/dashboardnew").then(
      (result: any) => {
        this.hidef = true;
        if (result.message == "ok") {
          if (result.user == undefined) {
            this.services.saveuser(null);
            this.app.getRootNav().setRoot(IntroPage);
          } else {
            if (result.user.user_device != device) {
              this.services.saveuser(null);
              this.app.getRootNav().setRoot(IntroPage);
            }
            this.games = result.games;
            this.image_url = result.image_url;
            this.services.userbalancedata = result.balance;
            this.services.whatsapp = result.whatsapp;
            this.services.Email_ID = result.email;
            this.services.upidetail = result.upidetail;
            this.dashboard_data = result;
            this.last_result = result.last_result;
            this.services.notificationcount = result.notification_count;
            this.lastforresult =
              result.last_result_four.length > 0 ? result.last_result_four : [];
            this.lastdashforresult =
              result.result_open_time.length > 0 ? result.result_open_time : [];
            this.slider = result.slider;

            this.services.APP_FACEBOOK = result.facebook;
            this.services.APP_INSTA = result.instagram;
            this.services.APP_TWITTER = result.telegram;
            this.services.APP_YOUTUBE = result.youtube;
          }
        }
      },
      (err) => {
        console.log(err);
        this.hidef = true;
      }
    );
  }
}
