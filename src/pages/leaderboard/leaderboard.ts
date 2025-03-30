import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { DomSanitizer } from "@angular/platform-browser";
import { ServicesProvider } from "../../providers/services/services";
/**
 * Generated class for the LeaderboardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-leaderboard",
  templateUrl: "leaderboard.html",
})
export class LeaderboardPage {
  test: any = {};
  hidef: boolean = false;
  my_url: any = "exam/leaderboard";
  my_iframe_url: any = "";
  user_data: any = {};
  currentscreen: any = 1;
  alertShown: boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private services: ServicesProvider,
    private sanitize: DomSanitizer
  ) {
    this.test = this.navParams.get("test_id");
    console.log(this.test);
    this.my_iframe_url = this.sanitize.bypassSecurityTrustResourceUrl(
      this.services.apiUrl + "" + this.my_url + "/" + this.test
    );
    this.getuserdata();
    setTimeout(() => {
      this.hidef = true;
    }, 3000);
  }

  ionViewWillEnter() {
    this.currentscreen = 1;
  }

  ionViewWillLeave() {
    this.currentscreen = 0;
  }

  getuserdata() {
    this.services.getuser().then((user) => {
      let userdata: any = { student_id: 0 };
      userdata = user;
      if (userdata != null && userdata.student_id != undefined) {
        this.user_data = user;
        console.log(this.user_data, "this.user_data ");
        this.my_iframe_url = this.sanitize.bypassSecurityTrustResourceUrl(
          this.services.apiUrl +
            "" +
            this.my_url +
            "/" +
            this.test +
            "/" +
            this.user_data.student_id
        );
      } else {
        this.getuserdata();
      }
    });
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad StartexamPage");
  }
}
