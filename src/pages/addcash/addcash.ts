import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ModalController,
} from "ionic-angular";
import { ServicesProvider } from "../../providers/services/services";
import { InAppBrowser } from "@ionic-native/in-app-browser";
import { Camera, CameraOptions } from "@ionic-native/camera";
import * as moment from "moment";
import { Clipboard } from "@ionic-native/clipboard";
import { TabsPage } from "../tabs/tabs";

/**
 * Generated class for the AddcashPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var window: any;

import { WebIntent } from "@ionic-native/web-intent";

@IonicPage()
@Component({
  selector: "page-addcash",
  templateUrl: "addcash.html",
})
export class AddcashPage {
  cash_project: any = 500;
  userInfo: any = {};
  zufall: any = Math.floor(Math.random() * 5);
  result_data: any = {};
  payment_request: any = {};
  inAppBrowserRef: any;
  check_payment_interval: any;
  options: any;
  changeproffimage: any = "";
  attachment: any = "";
  error_message: any = "";
  money_requested: any = [];
  minimum_amount: any = 50;
  user_payment_method: any = "";
  user_upi: any = "";
  upi_data: any = {};

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private services: ServicesProvider,
    private iab: InAppBrowser,
    private camera: Camera,
    private clipboard: Clipboard
  ) {
    this.result_data = this.navParams.get("result_data");
    this.services.getuser().then((user) => {
      console.log(user);
      if (user != null) {
        this.userInfo = user;
        this.getaddmoneyrequest();
      }
    });
  }

  changedateformat(dated) {
    return moment(dated).format("DD,MMM YYYY");
  }

  changetimeformat(dated) {
    return moment(dated).format("hh:mm");
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad AddcashPage");
  }

  selectcash(cash) {
    this.cash_project = cash;
  }

  ionViewWillLeave() {
    clearInterval(this.check_payment_interval);
  }

  copytext(d) {
    this.clipboard.copy(d);
    this.services.presentToast("UPI copied successfully");
  }

  onSaveBooking() {
    if (this.cash_project <= 0) {
      this.error_message =
        "Please Enter Amount Greater than " + this.minimum_amount;
      return false;
    }
    if (this.minimum_amount > this.cash_project) {
      this.error_message =
        "Please Enter Amount Greater than " + this.minimum_amount;
      return false;
    }

    let credentials = {
      mr_user_id: this.userInfo.user_id,
      mr_mobile: this.userInfo.user_mobile,
      mr_amount: this.cash_project,
      mr_screen_shot: this.attachment,
      mr_method: this.user_payment_method,
      mr_upi: this.user_upi,
    };
    let loading = this.services._loader_content();
    loading.present();
    this.services.commonfunction(credentials, "dashboard/moneyrequest").then(
      (result: any) => {
        loading.dismiss();
        if (result.message == "ok") {
          if (
            result.response &&
            result.response.data &&
            result.response.data.payment_url
          ) {
            this.paytmpayment(result.response);
          }
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  paytmpayment(result) {
    console.log(result);
    let inAppBrowserRef = this.iab.create(
      result.data.payment_url,
      "_system",
      "location=no"
    );
    this.check_payment_interval = setInterval(() => {
      this.checkpaymentstatus(inAppBrowserRef, result.order_id);
    }, 3000);

    inAppBrowserRef.on("exit").subscribe(
      () => {
        clearInterval(this.check_payment_interval);
      },
      (err) => {
        console.error(err);
      }
    );
  }

  checkpaymentstatus(inAppBrowserRef, obj) {
    let credentials = { payment_id: obj };
    this.services
      .commonfunction(credentials, "dashboard/checkpaymentstatus")
      .then(
        (result: any) => {
          if (result.status == "completed") {
            clearInterval(this.check_payment_interval);
            inAppBrowserRef.close();
            this.services.presentToast(
              "Amount Added to your wallet successfully"
            );
            this.navCtrl.pop();
          } else if (result.status == "pending") {
            this.services.simplealert("Pending", "Transacton is under process");
            this.navCtrl.setRoot(TabsPage);
          }
        },
        (err) => {
          console.log(err);
        }
      );
  }

  strpos(haystack, needle, offset) {
    var i = (haystack + "").indexOf(needle, offset || 0);
    return i === -1 ? false : i;
  }

  attchimage() {
    this.selectPicture().then((image) => {
      if (image != "") {
        this.changeproffimage = image;
        this.upload("jpg");
      }
    });
  }

  selectPicture() {
    return new Promise((resolve) => {
      let options: CameraOptions = {
        quality: 50,
        targetWidth: 1000,
        targetHeight: 750,
        destinationType: this.camera.DestinationType.DATA_URL,
        sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
        allowEdit: false,
      };

      this.camera.getPicture(options).then(
        (imageData) => {
          return resolve(imageData);
        },
        (err) => {
          resolve("");
        }
      );
    });
  }

  upload(type) {
    if (this.changeproffimage != "") {
      let credentials = { image_data: this.changeproffimage, from: "user" };
      let loading = this.services._loader_content();
      loading.present();
      this.services.commonfunction(credentials, "register/uploadimage").then(
        (result: any) => {
          loading.dismiss();
          if (result.message == "ok") {
            this.attachment = result.url;
          } else {
            this.services.simplealert("Failed", result.notification);
          }
        },
        (err) => {
          console.log(err);
          loading.dismiss();
        }
      );
    }
  }

  getaddmoneyrequest() {
    let loading: any = this.services._loader_content();
    loading.present();

    let data = { user_id: this.userInfo.user_id };
    this.services.commonfunction(data, "dashboard/getmoneyrequest").then(
      (result: any) => {
        if (result.message == "ok") {
          this.money_requested = result.results;
          this.minimum_amount = result.minimum;
          this.upi_data = result.results_data;
        }
        loading.dismiss();
      },
      (error) => {
        loading.dismiss();
      }
    );
  }
}
