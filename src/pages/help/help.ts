import { Component } from "@angular/core";
import { InAppBrowser } from "@ionic-native/in-app-browser";
import { IonicPage, NavController, NavParams } from "ionic-angular";

/**
 * Generated class for the HelpPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-help",
  templateUrl: "help.html",
})
export class HelpPage {
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private iab: InAppBrowser
  ) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad HelpPage");
  }

  openurl(t) {
    this.iab.create(t, "_system");
  }
}
