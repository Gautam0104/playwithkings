import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { LoginPage } from "../login/login";
import { RegisterPage } from "../register/register";
import { StatusBar } from "@ionic-native/status-bar";
import { ServicesProvider } from "../../providers/services/services";
import { TabsPage } from "../tabs/tabs";
import { GooglePlus } from "@ionic-native/google-plus";
import { Device } from "@ionic-native/device";
import { InAppBrowser } from "@ionic-native/in-app-browser";
import { Platform } from "ionic-angular";

/**
 * Generated class for the IntroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-intro",
  templateUrl: "intro.html",
})
export class IntroPage {
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public statusBar: StatusBar,
    private services: ServicesProvider,
    private googlePlus: GooglePlus,
    private device: Device,
    private iab: InAppBrowser,
    private platform: Platform
  ) {
    setTimeout(() => {
      statusBar.show();
      statusBar.overlaysWebView(false);
      statusBar.backgroundColorByHexString("#2D2D2D");
      statusBar.styleLightContent();
    }, 1000);
  }
  openyoutube() {
    this.iab.create("https://www.youtube.com/watch?v=gLfCUYuss8I", "_system");
  }
  ionViewWillEnter() {
    this.services.getuser().then((userloc) => {
      console.log(userloc, "userlac");

      if (userloc != null && userloc != undefined) {
        this.navCtrl.setRoot(TabsPage);
      }
    });
  }
  ionViewDidLoad() {
    if (this.platform.is("cordova")) {
      this.statusBar.show();
      this.statusBar.overlaysWebView(true);
      this.statusBar.backgroundColorByHexString("#000000");
      this.statusBar.styleLightContent();
    }

    // Direct navigation to TabsPage
    this.navCtrl.setRoot(TabsPage);
  }
  openlogin() {
    this.navCtrl.push(LoginPage);
  }
  openregister() {
    this.navCtrl.push(RegisterPage);
  }

  signinwithfacebook() {
    /*this.fb.login(['public_profile', 'email'])
.then((res: FacebookLoginResponse) => {
  console.log(res.authResponse,"res.authResponse");
  this.loginUserUsingFacebook(res.authResponse);
})
.catch(e => {
  console.log('Error logging into Facebook', e);
});*/
  }
  loginViaFacebook() {
    if (this.platform.is("cordova")) {
      this.googlePlus
        .login({})
        .then((res) => this.googlelogincheck(res))
        .catch((err) => {
          console.log("GooglePlus login error:", err);
          this.services.presentToast(
            "Google login is not available. Please try another login method."
          );
        });
    } else {
      // Browser environment - show message
      this.services.presentToast("Please use the mobile app for Google login");
    }
  }
  loginUserUsingFacebook(facebook_id) {
    console.log(facebook_id, "facebook_idggghhgh");
    //this.fb.logout();

    facebook_id["device_id"] = this.device.uuid;
    let loading = this.services._loader_content();
    loading.present();
    this.services
      .commonfunction(facebook_id, "register/facebooklogincheck")
      .then(
        (result: any) => {
          loading.dismiss();
          if (result.message == "ok") {
            if (result.results.user_status == 1) {
              this.services.saveuser(result.results);
              this.navCtrl.setRoot(TabsPage);
            } else {
              this.navCtrl.push(RegisterPage, { user_data: result.results });
            }
            alert(JSON.stringify(result));
          } else {
            alert(JSON.stringify(result));
          }
        },
        (error) => {
          loading.dismiss();
          alert(JSON.stringify(error));
        }
      );
  }
  googlelogincheck(facebook_id) {
    console.log(facebook_id, "facebook_id");
    this.googlePlus.logout();
    let loading = this.services._loader_content();
    loading.present();
    facebook_id["device_id"] = this.device.uuid;

    this.services
      .commonfunction(facebook_id, "register/facebooklogincheck")
      .then(
        (result: any) => {
          loading.dismiss();
          if (result.message == "ok") {
            if (result.results.user_status == 1) {
              this.services.saveuser(result.results);
              this.navCtrl.setRoot(TabsPage);
            } else if (
              result.results.user_status == 0 &&
              result.results.user_locked == 0
            ) {
              this.navCtrl.push(RegisterPage, { user_data: result.results });
            } else {
              alert("Please contact admin for register your id");
            }
          }
          ////      alert(JSON.stringify(result));
        },
        (error) => {
          loading.dismiss();
          ////  alert(JSON.stringify(error));
        }
      );
  }
}
