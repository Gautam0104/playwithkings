import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  App,
  AlertController,
  Events,
  ActionSheetController,
} from "ionic-angular";
import { ProfilePage } from "../profile/profile";
import { HelpPage } from "../help/help";
import { SharePage } from "../share/share";
import { WalletPage } from "../wallet/wallet";
import { OfferPage } from "../offer/offer";
import { ServicesProvider } from "../../providers/services/services";
import { PurchasePage } from "../purchase/purchase";
import { IntroPage } from "../intro/intro";
import { Camera, CameraOptions } from "@ionic-native/camera";
import { InAppBrowser } from "@ionic-native/in-app-browser";
import { SocialSharing } from "@ionic-native/social-sharing";
import { MysubscriptionPage } from "../mysubscription/mysubscription";
import { BiddingPage } from "../bidding/bidding";
import { MyharfPage } from "../myharf/myharf";
import { OldrecoredsPage } from "../oldrecoreds/oldrecoreds";
import { StatementPage } from "../statement/statement";
import { MywinsPage } from "../mywins/mywins";
import { WebviewPage } from "../webview/webview";
import { OverallbidPage } from "../overallbid/overallbid";
import { RecenttransactionPage } from "../recenttransaction/recenttransaction";

/**
 * Generated class for the AccountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-account",
  templateUrl: "account.html",
})
export class AccountPage {
  user_info: any = {};
  changeproffimage: any = "";

  user_code: any = "";
  user_sharemessage: any = "";
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private services: ServicesProvider,
    private app: App,
    private alertcontroller: AlertController,
    private events: Events,
    private inapp: InAppBrowser,
    public actionSheetCtrl: ActionSheetController,
    private camera: Camera,
    private socialSharing: SocialSharing
  ) {
    this.services.getuser().then((userloc) => {
      console.log(userloc, "userlac");

      if (userloc != null && userloc != undefined) {
        this.user_info = userloc;
        this.loadshareingdata();
      }
    });
  }
  ionViewWillEnter() {
    this.services.active_page = "Account";
  }
  ionViewDidLoad() {
    console.log("ionViewDidLoad AccountPage");
  }
  openbidding() {
    this.app.getRootNav().push(OverallbidPage);
  }

  openharf() {
    this.app.getRootNav().push(MyharfPage);
  }
  oldrecoreds() {
    this.app.getRootNav().push(OldrecoredsPage);
  }
  statementdata() {
    this.app.getRootNav().push(StatementPage);
  }
  rateus() {
    this.inapp.create(this.services.playstoreurl, "_system");
  }
  openprofile() {
    this.app.getRootNav().push(ProfilePage);
  }
  openhelp() {
    this.app.getRootNav().push(HelpPage);
  }

  loadshareingdata() {
    let cred: any = { user_id: this.user_info.student_id };
    this.services.commonfunction(cred, "register/sharetext").then(
      (result: any) => {
        if (result.message == "ok") {
          this.user_code = result.user_share_code;
          this.user_sharemessage = result.text_share_message;
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }
  openshare() {
    this.app.getRootNav().push(SharePage);
  }
  openoffer() {
    this.app.getRootNav().push(OfferPage);
  }
  openwallet() {
    this.app.getRootNav().push(WalletPage);
  }
  mywins() {
    this.app.getRootNav().push(MywinsPage);
  }
  logoutUser() {
    let alert = this.alertcontroller.create({
      title: "Are you sure?",
      message: "Do you want to logout?",
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          handler: () => {},
        },
        {
          text: "Yes",
          handler: () => {
            this.services.saveuser(null);
            this.events.publish(
              "user_playonlinesatta:created",
              null,
              Date.now()
            );
            this.app.getRootNav().setRoot(IntroPage);
          },
        },
      ],
    });
    alert.present();
  }
  changeimage() {
    let actionSheet = this.actionSheetCtrl.create({
      title: "Select Image source",
      buttons: [
        {
          text: "Load from Library",
          handler: () => {
            this.selectPicture().then((image) => {
              this.changeproffimage = image;
              this.upload("jpg");
            });
          },
        },
        {
          text: "Use Camera",
          handler: () => {
            this.takePicture().then((image) => {
              this.changeproffimage = image;
              this.upload("jpg");
            });
          },
        },
        {
          text: "Cancel",
          role: "cancel",
        },
      ],
    });

    actionSheet.present();
  }
  selectPicture() {
    return new Promise((resolve) => {
      let options: CameraOptions = {
        quality: 50,
        targetWidth: 1000,
        targetHeight: 750,
        destinationType: this.camera.DestinationType.DATA_URL,
        sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
        allowEdit: true,
      };

      this.camera.getPicture(options).then(
        (imageData) => {
          // imageData is either a base64 encoded string or a file URI
          // If it's base64 (DATA_URL):
          //alert(imageData)

          return resolve(imageData);
        },
        (err) => {
          // Handle error
          // alert("error "+JSON.stringify(err))
          resolve("");
        }
      );
    });
  }

  takePicture() {
    return new Promise((resolve) => {
      let options: CameraOptions = {
        quality: 50,
        targetWidth: 1000,
        targetHeight: 750,
        destinationType: this.camera.DestinationType.DATA_URL,
        mediaType: this.camera.MediaType.PICTURE,
        allowEdit: true,
      };

      this.camera.getPicture(options).then(
        (imageData) => {
          // imageData is either a base64 encoded string or a file URI
          // If it's base64 (DATA_URL):
          //alert(imageData)

          return resolve(imageData);
        },
        (err) => {
          // Handle error
          //  alert("error "+JSON.stringify(err))
          resolve("");
        }
      );
    });
  }

  upload(type) {
    if (this.changeproffimage != "") {
      let credentials = {
        image_data: this.changeproffimage,
        from: "user",
        student_id: this.user_info.user_id,
      };
      let loading = this.services._loader_content();
      loading.present();
      this.services
        .commonfunction(credentials, "register/updateuserprofile")
        .then(
          (result: any) => {
            loading.dismiss();
            if (result.message == "ok") {
              this.user_info = result.results;
              this.events.publish(
                "user_playonlinesatta:created",
                result.results,
                Date.now()
              );
              this.services.saveuser(result.results);
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

  opensubscription() {
    this.app.getRootNav().push(MysubscriptionPage);
  }
  openterms() {
    this.app
      .getRootNav()
      .push(WebviewPage, {
        title: "Terms & Condition",
        url: "terms-conditions",
      });
  }

  openplay() {
    this.app
      .getRootNav()
      .push(WebviewPage, { title: "How to Play", url: "how-to-play" });
  }
  openrecent() {
    this.app.getRootNav().push(RecenttransactionPage);
  }
}
