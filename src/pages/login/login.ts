import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams, Events } from "ionic-angular";
import { TabsPage } from "../tabs/tabs";
import { ServicesProvider } from "../../providers/services/services";

import { ForgotpasswordPage } from "../forgotpassword/forgotpassword";
import { LoginviaotpPage } from "../loginviaotp/loginviaotp";
import { RegisterPage } from "../register/register";
import { Device } from "@ionic-native/device";
import { InAppBrowser } from "@ionic-native/in-app-browser";

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-login",
  templateUrl: "login.html",
})
export class LoginPage {
  type: any = "password";
  user_password: any = "";
  user_email: any = "";
  loginErrorMsg: any = "";
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public services: ServicesProvider,
    private events: Events,
    private device: Device,
    private iab: InAppBrowser
  ) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad LoginPage");
  }
  openyoutube() {
    this.iab.create("https://www.youtube.com/watch?v=gLfCUYuss8I", "_system");
  }
  signup() {
    this.navCtrl.pop();
    this.services.presentToast("Please Register with gmail");
  }
  openloginviaotp() {
    this.navCtrl.push(LoginviaotpPage);
  }
  forgotpass() {
    this.navCtrl.push(ForgotpasswordPage);
  }
  settype() {
    if (this.type == "password") {
      this.type = "text";
    } else {
      this.type = "password";
    }
  }

  loginwithemailpass() {
    if (this.user_email == "") {
      this.loginErrorMsg = "Please Enter Email id / Mobile Number";
      return;
    }
    if (this.user_password == "") {
      this.loginErrorMsg = "Please Enter Password";
      return;
    }
    this.loginErrorMsg = "";
    let user_device_l: any = this.device.uuid;
    if (user_device_l == "" || user_device_l == null) {
      user_device_l = "WAP";
    }
    let credentials = {
      user_name: this.user_email,
      user_password: this.user_password,
      user_device: user_device_l,
    };
    let loading = this.services._loader_content();
    loading.present();
    this.services.commonfunction(credentials, "register/login").then(
      (result: any) => {
        loading.dismiss();
        if (result.message == "ok") {
          this.events.publish(
            "user_playonlinesatta:created",
            result.result,
            Date.now()
          );
          this.services.saveuser(result.result);
          this.navCtrl.setRoot(TabsPage);
        } else {
          this.loginErrorMsg = result.notification;
        }
      },
      (err) => {
        console.log(err);
        loading.dismiss();
      }
    );
  }

  signinwithfacebook() {
    /*  this.fb.login(['public_profile', 'email'])
  .then((res: FacebookLoginResponse) => {
    console.log(res.authResponse,"res.authResponse");
    this.loginUserUsingFacebook(res.authResponse);
  })
  .catch(e => {
    console.log('Error logging into Facebook', e);
  });*/
  }
  loginViaFacebook() {
    /*this.googlePlus.login({})
  .then(res => this.googlelogincheck(res))
  .catch(err => console.log(err)); */
  }
  loginUserUsingFacebook(facebook_id) {
    console.log(facebook_id, "facebook_idggghhgh");
    /// this.fb.logout();
    let loading = this.services._loader_content();
    loading.present();
    this.services
      .commonfunction(facebook_id, "register/facebooklogincheck")
      .then(
        (result: any) => {
          loading.dismiss();
          if (result.message == "ok") {
            if (result.results.student_status == 1) {
              this.services.saveuser(result.results);
              this.navCtrl.setRoot(TabsPage);
            } else {
              this.navCtrl.push(RegisterPage, { user_data: result.results });
            }
          }
        },
        (error) => {
          loading.dismiss();
        }
      );
  }
  googlelogincheck(facebook_id) {
    console.log(facebook_id, "facebook_id");
    let loading = this.services._loader_content();
    loading.present();
    this.services.commonfunction(facebook_id, "register/googlelogincheck").then(
      (result: any) => {
        loading.dismiss();
        if (result.message == "ok") {
          if (result.results.student_status != 0) {
            this.services.saveuser(result.results);
            this.navCtrl.setRoot(TabsPage);
          } else {
            this.navCtrl.push(RegisterPage, { user_data: result.results });
          }
        }
      },
      (error) => {
        loading.dismiss();
      }
    );
  }
}
