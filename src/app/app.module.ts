import { NgModule, ErrorHandler } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { IonicApp, IonicModule, IonicErrorHandler } from "ionic-angular";
import { MyApp } from "./app.component";
import { AngularFireModule } from "angularfire2";
import { AngularFireDatabaseModule } from "angularfire2/database";
import { AngularFireAuthModule } from "angularfire2/auth";
import { AngularFireStorageModule } from "angularfire2/storage";
import { firebaseConfig } from "../config/firebase.config";
import { FirebaseProvider } from "../providers/firebase/firebase";

import { AboutPage } from "../pages/about/about";
import { ContactPage } from "../pages/contact/contact";
import { HomePage } from "../pages/home/home";
import { TabsPage } from "../pages/tabs/tabs";
import { ServicesProvider } from "../providers/services/services";
import { IntroPage } from "../pages/intro/intro";
import { LoginPage } from "../pages/login/login";
import { RegisterPage } from "../pages/register/register";
import { OtpPage } from "../pages/otp/otp";
import { AccountPage } from "../pages/account/account";
import { TestseriesPage } from "../pages/testseries/testseries";
import { NotificationPage } from "../pages/notification/notification";
import { ProfilePage } from "../pages/profile/profile";
import { MysubscriptionPage } from "../pages/mysubscription/mysubscription";
import { Base64 } from "@ionic-native/base64";
import { Chooser } from "@ionic-native/chooser";
import { CallNumber } from "@ionic-native/call-number";

import { DocumentViewer } from "@ionic-native/document-viewer";
import { FileEncryption } from "@ionic-native/file-encryption";

import { ForgotpasswordPage } from "../pages/forgotpassword/forgotpassword";
import { LoginviaotpPage } from "../pages/loginviaotp/loginviaotp";
import { ChangepasswordPage } from "../pages/changepassword/changepassword";
import { DatePicker } from "@ionic-native/date-picker";
import { Insomnia } from "@ionic-native/insomnia";

import { HelpPage } from "../pages/help/help";
import { SharePage } from "../pages/share/share";
import { OfferPage } from "../pages/offer/offer";
import { FaqPage } from "../pages/faq/faq";
import { NewsPage } from "../pages/news/news";
import { ThankyouPage } from "../pages/thankyou/thankyou";
import { OrderdetailPage } from "../pages/orderdetail/orderdetail";
import { LeaderboardPage } from "../pages/leaderboard/leaderboard";
import { PurchasePage } from "../pages/purchase/purchase";
import { WebviewPage } from "../pages/webview/webview";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { InAppBrowser } from "@ionic-native/in-app-browser";
import { HttpClientModule } from "@angular/common/http";
import { Device } from "@ionic-native/device";
import { IonicStorageModule } from "@ionic/storage";
import { SocialSharing } from "@ionic-native/social-sharing";
import { Camera } from "@ionic-native/camera";
import { AndroidPermissions } from "@ionic-native/android-permissions";
import { File } from "@ionic-native/file";
import { FileChooser } from "@ionic-native/file-chooser";
import { FileTransfer } from "@ionic-native/file-transfer";
import { FileOpener } from "@ionic-native/file-opener";
import { Clipboard } from "@ionic-native/clipboard";

import { WithdrawrequestPage } from "../pages/withdrawrequest/withdrawrequest";
import { AddcashPage } from "../pages/addcash/addcash";
import { NgxWheelModule } from "ngx-wheel";
import { HarfPage } from "../pages/harf/harf";
import { MyharfPage } from "../pages/myharf/myharf";
import { StatementPage } from "../pages/statement/statement";
import { OldrecoredsPage } from "../pages/oldrecoreds/oldrecoreds";
import { MywinsPage } from "../pages/mywins/mywins";
import { BiddingPage } from "../pages/bidding/bidding";
import { PlacebetPage } from "../pages/placebet/placebet";
import { WinninglistPage } from "../pages/winninglist/winninglist";
import { OldrecordelistPage } from "../pages/oldrecordelist/oldrecordelist";
import { MywinninglistPage } from "../pages/mywinninglist/mywinninglist";
import { SpinwheelrulePage } from "../pages/spinwheelrule/spinwheelrule";
import { BetpopupPage } from "../pages/betpopup/betpopup";
import { BetoptionpopPage } from "../pages/betoptionpop/betoptionpop";
import { GooglePlus } from "@ionic-native/google-plus";
import { ColorsbetPage } from "../pages/colorsbet/colorsbet";
import { ChoosecolortypePage } from "../pages/choosecolortype/choosecolortype";
import { AddpromocodePage } from "../pages/addpromocode/addpromocode";
import { OverallbidPage } from "../pages/overallbid/overallbid";
import { ColorbethistoryPage } from "../pages/colorbethistory/colorbethistory";
import { LeveluserPage } from "../pages/leveluser/leveluser";
import { RecenttransactionPage } from "../pages/recenttransaction/recenttransaction";
import { ViewmorecolorsPage } from "../pages/viewmorecolors/viewmorecolors";
import { WebIntent } from "@ionic-native/web-intent";
import { WalletPage } from "../pages/wallet/wallet";

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    IntroPage,
    LoginPage,
    RegisterPage,
    OtpPage,
    AccountPage,
    TestseriesPage,
    NotificationPage,
    ViewmorecolorsPage,
    ProfilePage,
    RecenttransactionPage,
    HelpPage,
    ColorsbetPage,
    OverallbidPage,
    ColorbethistoryPage,
    LeveluserPage,
    SharePage,
    SpinwheelrulePage,
    ChoosecolortypePage,
    AddpromocodePage,
    OfferPage,
    MysubscriptionPage,
    OldrecordelistPage,
    BetpopupPage,
    BetoptionpopPage,
    FaqPage,
    MyharfPage,
    StatementPage,
    OldrecoredsPage,
    MywinsPage,
    BiddingPage,
    NewsPage,
    LeaderboardPage,
    HarfPage,
    WinninglistPage,
    WalletPage,
    LoginviaotpPage,
    ForgotpasswordPage,
    ChangepasswordPage,
    WebviewPage,
    PurchasePage,
    ThankyouPage,
    OrderdetailPage,
    WithdrawrequestPage,
    AddcashPage,
    PlacebetPage,
    MywinninglistPage,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgxWheelModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    IntroPage,
    LoginPage,
    RegisterPage,
    OtpPage,
    AccountPage,
    TestseriesPage,
    NotificationPage,
    ViewmorecolorsPage,
    ProfilePage,
    RecenttransactionPage,
    HelpPage,
    AddpromocodePage,
    OverallbidPage,
    ColorbethistoryPage,
    SharePage,
    ColorsbetPage,
    ChoosecolortypePage,
    LeveluserPage,
    OfferPage,
    MysubscriptionPage,
    SpinwheelrulePage,
    BetpopupPage,
    BetoptionpopPage,
    FaqPage,
    MyharfPage,
    StatementPage,
    OldrecoredsPage,
    MywinsPage,
    BiddingPage,
    NewsPage,
    LeaderboardPage,
    HarfPage,
    WinninglistPage,
    OldrecordelistPage,
    WalletPage,
    LoginviaotpPage,
    ForgotpasswordPage,
    ChangepasswordPage,
    WebviewPage,
    PurchasePage,
    ThankyouPage,
    OrderdetailPage,
    WithdrawrequestPage,
    AddcashPage,
    PlacebetPage,
    MywinninglistPage,
  ],
  providers: [
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    StatusBar,
    SplashScreen,
    Insomnia,
    FileEncryption,
    Base64,
    Chooser,
    GooglePlus,
    Clipboard,
    WebIntent,
    DatePicker,
    FileOpener,
    DocumentViewer,
    CallNumber,
    ServicesProvider,
    InAppBrowser,
    Device,
    SocialSharing,
    Camera,
    AndroidPermissions,
    File,
    FileChooser,
    FileTransfer,
    FirebaseProvider,
  ],
})
export class AppModule {}
