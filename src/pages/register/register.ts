import { Component } from "@angular/core";
import { Events, IonicPage, NavController, NavParams } from "ionic-angular";
import { OtpPage } from "../otp/otp";
import { LoginPage } from "../login/login";
import { ServicesProvider } from "../../providers/services/services";
import { FormBuilder, FormGroup, FormControl } from "@angular/forms";
import { TabsPage } from "../tabs/tabs";
import { Device } from "@ionic-native/device";
import { InAppBrowser } from "@ionic-native/in-app-browser";

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-register",
  templateUrl: "register.html",
})
export class RegisterPage {
  registerForm: FormGroup;
  registerErrorMsg: any = "";
  reff_enable: boolean = false;
  type: any = "password";
  user_data: any = {};
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private services: ServicesProvider,
    public formBuilder: FormBuilder,
    private events: Events,
    private device: Device,
    private iab: InAppBrowser
  ) {
    if (this.navParams.get("user_data") != undefined) {
      this.user_data = this.navParams.get("user_data");
    }
    this.registerForm = this.formBuilder.group({
      student_first_name: new FormControl(""),
      student_last_name: new FormControl(""),
      student_email: new FormControl(""),
      student_phone: new FormControl(""),
      student_password: new FormControl(""),
      student_ref_id: new FormControl(""),
    });
  }
  settype() {
    if (this.type == "password") {
      this.type = "text";
    } else {
      this.type = "password";
    }
  }
  ionViewDidLoad() {
    console.log("ionViewDidLoad RegisterPage");
  }
  openotp() {
    this.navCtrl.push(OtpPage);
  }
  openlogin() {
    this.navCtrl.push(LoginPage);
  }
  getref(ev: any) {
    console.log(ev.checked, "ev.checked");
    if (ev.checked) {
      this.reff_enable = true;
    } else {
      this.reff_enable = false;
    }
  }
  doRegister() {
    let credentials = this.registerForm.value;
    if (credentials["student_first_name"] == "") {
      this.registerErrorMsg = "Please Enter First Name";
      return;
    }
    if (!this.allLetter(credentials["student_first_name"])) {
      this.registerErrorMsg = "Please Enter valid First Name";
      return;
    }

    if (credentials["student_phone"] == "") {
      this.registerErrorMsg = "Please Enter Mobile Number";
      return;
    }
    console.log(credentials["student_phone"], "credentials['student_phone']");
    if (!this.validphone(credentials["student_phone"].trim())) {
      this.registerErrorMsg = "Please Enter Valid Mobile Number";
      return;
    }

    if (credentials["student_email"] == "") {
      this.registerErrorMsg = "Please Enter Email Id";
      return;
    }
    if (!this.ValidateEmail(credentials["student_email"])) {
      this.registerErrorMsg = "Please Enter Valid Email Id";
      return;
    }

    if (credentials["student_password"] == "") {
      this.registerErrorMsg = "Please Enter Password";
      return;
    }
    if (credentials["student_password"].length < 6) {
      this.registerErrorMsg = "Please Enter 6 digits Password";
      return;
    }
    if (credentials["student_ref_id"] == "") {
      ///this.registerErrorMsg = 'Please Enter referral code';
      ///return;
    }

    this.registerErrorMsg = "";

    if (this.user_data["user_id"] != undefined) {
      credentials["user_id"] = this.user_data["user_id"];
    }

    credentials["user_first_name"] = credentials["student_first_name"];
    credentials["user_mobile"] = credentials["student_phone"];
    credentials["user_email_id"] = credentials["student_email"];
    credentials["user_password"] = credentials["student_password"];
    credentials["pre_share_code"] = credentials["student_ref_id"];
    credentials["user_custom_id"] = "";
    credentials["user_device"] = this.device.uuid;

    let loading = this.services._loader_content();
    loading.present();
    this.services.commonfunction(credentials, "register").then(
      (result: any) => {
        loading.dismiss();
        if (result.message == "failed") {
          this.registerErrorMsg = result.notification;
        } else if (result.message == "ok") {
          ///this.navCtrl.push(OtpPage,{results:result.result,otpdirect:result.otpdirect});
          this.events.publish(
            "user_playonlinesatta:created",
            result.results,
            Date.now()
          );
          this.services.saveuser(result.results);
          this.navCtrl.setRoot(TabsPage);
        } else {
          this.registerErrorMsg = result.notification;
        }
      },
      (err) => {
        console.log(err);
        loading.dismiss();
      }
    );
  }
  allLetter(inputtxt) {
    var letters = /^[a-zA-Z\s]*$/;
    if (inputtxt.match(letters)) {
      return true;
    } else {
      return false;
    }
  }
  ValidateEmail(mail) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
      return true;
    } else {
      return false;
    }
  }
  validphone(phone) {
    console.log(phone);
    let phoneno = /^\d{10}$/;
    if (!phone.match(phoneno)) {
      return false;
    } else {
      return true;
    }
  }
  openyoutube() {
    this.iab.create("https://www.youtube.com/watch?v=gLfCUYuss8I", "_system");
  }
}
