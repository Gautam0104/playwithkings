import { Component } from "@angular/core";
import { NavController, Platform, AlertController } from "ionic-angular";
import { TestseriesPage } from "../testseries/testseries";
import { HomePage } from "../home/home";
import { AccountPage } from "../account/account";
import { HarfPage } from "../harf/harf";
import { ColorsbetPage } from "../colorsbet/colorsbet";

@Component({
  templateUrl: "tabs.html",
})
export class TabsPage {
  currentscreen: any = 1;
  alertShown: boolean = false;

  tab1Root = HomePage;
  tab2Root = TestseriesPage;
  tab3Root = HarfPage;
  tab4Root = ColorsbetPage;
  tab5Root = AccountPage;

  constructor(
    public nav: NavController,
    private platform: Platform,
    private alertCtrl: AlertController
  ) {}

  ionViewWillEnter() {
    this.currentscreen = 1;
  }

  ionViewWillLeave() {
    this.currentscreen = 0;
  }

  presentConfirm() {
    let alert = this.alertCtrl.create({
      title: "Confirm Exit",
      message: "Do you want to exit App?",
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          handler: () => {
            console.log("Cancel clicked");
            this.alertShown = false;
          },
        },
        {
          text: "Yes",
          handler: () => {
            console.log("Yes clicked");
            this.platform.exitApp();
          },
        },
      ],
    });
    alert.present().then(() => {
      this.alertShown = true;
    });
  }
}
