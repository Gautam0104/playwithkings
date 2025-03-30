import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {
  LoadingController,
  ActionSheetController,
  AlertController,
  ToastController,
  Platform,
} from "ionic-angular";
import { InAppBrowser } from "@ionic-native/in-app-browser";
import { Storage } from "@ionic/storage";
import moment from "moment";
import { AndroidPermissions } from "@ionic-native/android-permissions";
import { File } from "@ionic-native/file";
import { Camera, CameraOptions } from "@ionic-native/camera";
import { FileChooser } from "@ionic-native/file-chooser";
import { Device } from "@ionic-native/device";
import { timeout } from "rxjs/operators";

/*
  Generated class for the ServicesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
export enum ConnectionStatusEnum {
  Online,
  Offline,
}
@Injectable()
export class ServicesProvider {
  apiUrl = "https://world777game.com/techapi/";
  playstoreurl = "https://world777game.com/";
  WEB_URL = "https://world777game.com/";
  Email_ID: any = "info@world777game.com";
  mobile_number: any = "999999999";
  telegram: any = "";
  whatsapp: any = "";
  APP_VERSION_CODE: any = "1.1";
  student_id: any = 0;
  intervalstudent: any;
  previousStatus: any;
  callnumber: any = "";
  whatsappnumber: any = "";
  notificationcount: any = 0;
  cart_count: any = 0;
  select_category: any = {};
  active_page: any = "";
  settestpage: boolean = false;
  userbalancedata: any = 0;
  upidetail: any = "";

  APP_TWITTER: any = "";
  APP_INSTA: any = "";
  APP_FACEBOOK: any = "";
  APP_YOUTUBE: any = "";
  constructor(
    private http: HttpClient,
    private loadingCtrl: LoadingController,
    private actionSheetCtrl: ActionSheetController,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private platform: Platform,
    private storage: Storage,
    private inapp: InAppBrowser,
    private androidPermissions: AndroidPermissions,
    private file: File,
    private camera: Camera,
    private fileChooser: FileChooser,
    private device: Device
  ) {
    console.log("Hello ServicesProvider Provider");
    this.getupdatepopup();
    ///	this.getu();
    this.previousStatus = ConnectionStatusEnum.Online;
  }

  getu() {
    this.getuser().then((user) => {
      let userdata: any = { student_id: 0 };
      userdata = user;
      if (userdata != null && userdata.student_id != undefined) {
        this.student_id = userdata.student_id;
      } else {
        this.getu();
      }
    });
  }

  initializeNetworkEvents() {
    /* this.network.onDisconnect().subscribe(() => {
            if (this.previousStatus === ConnectionStatusEnum.Online) {
                this.eventCtrl.publish('network:offline');
            }
            this.previousStatus = ConnectionStatusEnum.Offline;
        });
        this.network.onConnect().subscribe(() => {
            if (this.previousStatus === ConnectionStatusEnum.Offline) {
                this.eventCtrl.publish('network:online');
            }
         });*/
  }
  getlogoutapp() {
    let data = { student: this.student_id, device_id: this.device.uuid };
    this.commonfunction(data, "dashboard/getlogoutversion").then(
      (result: any) => {
        if (result.message == "ok") {
          if (result.logout == 1) {
            clearInterval(this.intervalstudent);

            this.showlogoutPopup(result.result);
          }
        }
      }
    );
  }

  showlogoutPopup(versioncode) {
    let alert = this.alertCtrl.create({
      title: "Multiple Login",
      message:
        "you have login in " +
        versioncode.login_mobile_name +
        ".You have logout to this device. ",
      buttons: [
        {
          text: "Ok",
          role: "cancel",
          handler: () => {
            this.saveuser(null);
            this.showlogoutPopup(versioncode);
            //// this.nav.setRoot(IntroPage);
            this.platform.exitApp();
          },
        },
      ],
    });
    alert.present();
  }

  getupdatepopup() {
    this.getappversion().then((result: any) => {
      if (!result.error) {
        this.mobile_number = result.mobile;
        this.Email_ID = result.email;
        this.telegram = result.telegram;
        this.whatsapp = result.whatsapp;

        if (result.version > this.APP_VERSION_CODE) {
          this.showUpdatePopup(result.version);
        }
      }
      // If there's an error, just use the default values
    });
  }
  showUpdatePopup(versioncode) {
    let alert = this.alertCtrl.create({
      title: "New Version",
      message:
        versioncode +
        " version Available on btcexch. Please download new version from btcexch.in",
      buttons: [
        {
          text: "UPDATE",
          role: "cancel",
          handler: () => {
            this.showUpdatePopup(versioncode);
            this.inapp.create(this.playstoreurl, "_system");
          },
        },
      ],
    });
    alert.present();
  }

  getappversion() {
    return new Promise((resolve) => {
      if (this.platform.is("cordova")) {
        this.http
          .get(this.apiUrl + "dashboard/getappversion/")
          .pipe(timeout(5000)) // 5 seconds timeout
          .subscribe(
            (data) => {
              resolve(data);
            },
            (err) => {
              console.log("API Error:", err);
              // Return default values when API is not accessible
              resolve({
                version: this.APP_VERSION_CODE,
                mobile: this.mobile_number,
                email: this.Email_ID,
                telegram: this.telegram,
                whatsapp: this.whatsapp,
                error: true,
              });
            }
          );
      } else {
        // Web environment - use local version
        resolve({
          version: this.APP_VERSION_CODE,
          mobile: this.mobile_number,
          email: this.Email_ID,
          telegram: this.telegram,
          whatsapp: this.whatsapp,
          error: false,
        });
      }
    });
  }

  commonfunction(data, url) {
    return new Promise((resolve, reject) => {
      data["department"] = this.select_category.exam_cat_id;
      this.http.post(this.apiUrl + url, data).subscribe(
        (res) => {
          resolve(res);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }

  public _loader_content() {
    let loading = this.loadingCtrl.create({
      spinner: "crescent",
      duration: 10000000,
    });
    return loading;
  }

  simplealert(title, message) {
    let alert = this.alertCtrl.create({
      title: title,
      message: message,
      buttons: ["ok"],
    });
    alert.present();
  }

  presentToast(strmessage) {
    let toast = this.toastCtrl.create({
      message: strmessage,
      duration: 1000,
      position: "bottom",
    });

    toast.onDidDismiss(() => {
      console.log("Dismissed toast");
    });

    toast.present();
  }

  public log(error: any, from_page: any) {
    console.log(error, from_page);
  }

  getfirstcharactor(str) {
    return str.charAt(0).toUpperCase();
  }

  getuser() {
    return new Promise((resolve) => {
      if (this.platform.is("cordova")) {
        this.storage.get("user").then((user) => {
          resolve(user);
        });
      } else {
        // Web environment - return mock user data
        resolve({
          user_id: "1",
          name: "Demo User",
          email: "demo@example.com",
          mobile: "1234567890",
        });
      }
    });
  }
  getcart() {
    return new Promise((resolve) => {
      this.storage.get("user_cart").then((data) => {
        resolve(data);
      });
    });
  }
  getcartpackage() {
    return new Promise((resolve) => {
      this.storage.get("user_cart_package").then((data) => {
        resolve(data);
      });
    });
  }
  getdownloads() {
    return new Promise((resolve) => {
      this.storage.get("user_downloads").then((data) => {
        resolve(data);
      });
    });
  }

  getcoupon() {
    return new Promise((resolve) => {
      this.storage.get("user_coupon").then((data) => {
        resolve(data);
      });
    });
  }
  getexam(datad) {
    return new Promise((resolve) => {
      this.storage.get("exam" + datad).then((data) => {
        resolve(data);
      });
    });
  }
  gethomedata() {
    return new Promise((resolve) => {
      this.storage.get("dashboard").then((data) => {
        resolve(data);
      });
    });
  }

  getbetamount() {
    return new Promise((resolve) => {
      this.storage.get("user_betamount").then((data) => {
        resolve(data);
      });
    });
  }
  savehome(credentials) {
    this.storage.set("dashboard", credentials);
    return 0;
  }

  saveexam(credentials, name) {
    this.storage.set("exam" + name, credentials);
    return 0;
  }
  saveuser(credentials) {
    this.storage.set("user_playonlinesatta", credentials);
    return 0;
  }

  savebetmount(credentials) {
    this.storage.set("user_betamount", credentials);
    return 0;
  }

  savecoupon(credentials) {
    this.storage.set("user_coupon", credentials);
    return 0;
  }

  savedownloads(credentials) {
    this.storage.set("user_downloads", credentials);
    return 0;
  }
  savecart(credentials) {
    this.storage.set("user_cart", credentials);
    return 0;
  }
  savecartpackage(credentials) {
    this.storage.set("user_cart_package", credentials);
    return 0;
  }
  gettimeformateddate(date) {
    let data = moment(date).format("DD MMM YYYY");
    return data;
  }
  gettimeddatewithamdate(date) {
    let data = moment(date).format("DD MMM YYYY hh:mm A");
    return data;
  }
  gettimeddate(date) {
    let data = moment(date).format("hh:mm");
    return data;
  }
  gettimeddatewitham(date) {
    let data = moment(date).format("hh:mm A");
    return data;
  }
  gettimeformateddatewidthoutspace(date) {
    let data = moment(date).format("DDMMMYYYY");
    return data;
  }
  checkweatherdownloaded(filem, offlinedata) {
    let t = 0;
    console.log(offlinedata, "this.offlinedata.");
    offlinedata.forEach((Item) => {
      if (Item.pd_file_name == filem) {
        t = 1;
      }
    });
    return t;
  }
  getbookavgrating(arydata) {
    let ratingtotal: any = 0;
    let star5: any = 0;
    let star4: any = 0;
    let star3: any = 0;
    let star2: any = 0;
    let star1: any = 0;

    arydata.forEach((Item) => {
      console.log(Item);
      ratingtotal += parseInt(Item.reviews_star);
      if (Item.reviews_star == 5) {
        star5 += 1;
      }
      if (Item.reviews_star == 4) {
        star4 += 1;
      }
      if (Item.reviews_star == 3) {
        star3 += 1;
      }
      if (Item.reviews_star == 2) {
        star2 += 1;
      }
      if (Item.reviews_star == 1) {
        star1 += 1;
      }
    });

    let rate: any = arydata.length;

    let avg = ratingtotal / rate;
    return {
      avg_rate: avg,
      total: rate,
      ratingtotal: ratingtotal,
      star5_d: star5,
      star4_d: star4,
      star3_d: star3,
      star2_d: star2,
      star1_d: star1,
    };
  }
  getcoursepercentage(packaged) {
    let diff: number = 0;
    diff = packaged.sub_actual_price - packaged.sub_pack_price;
    let p: number = 0;
    p = diff / parseInt(packaged.sub_actual_price);
    let pd: number = 0;
    pd = p * 100;
    return pd.toFixed(0);
  }
  getbookpercentage(packaged) {
    ///console.log(packaged,"packaged");
    let diff: number = 0;
    diff = packaged.product_original_price - packaged.product_discount_price;
    let p: number = 0;
    p = diff / parseInt(packaged.product_original_price);
    let pd: number = 0;
    pd = p * 100;
    return pd.toFixed(0);
  }
  getfloattwo(amt) {
    return amt.toFixed(2);
  }
  dateDifference(firstdate) {
    let dropdt: any = new Date();
    let pickdt: any = new Date(firstdate);
    let d = (dropdt - pickdt) / (24 * 3600 * 1000);
    return d.toFixed(0);
  }

  checkweatherdownloadeds(url) {
    return new Promise((resolve) => {
      const filem = this.GetFilename(url) + ".mp4";
      this.androidPermissions
        .checkPermission(
          this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE
        )
        .then((status) => {
          if (status.hasPermission) {
            const filepath =
              this.file.externalDataDirectory + "training_videos";
            this.file
              .checkFile(filepath, filem)
              .then((files) => {
                resolve(true);
              })
              .catch((err) => {
                resolve(false);
              });
          } else {
            this.androidPermissions
              .requestPermission(
                this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE
              )
              .then((status) => {
                if (status.hasPermission) {
                  const filepath =
                    this.file.externalDataDirectory + "training_videos";
                  this.file
                    .checkFile(filepath, filem)
                    .then((files) => {
                      resolve(true);
                    })
                    .catch((err) => {
                      resolve(false);
                    });
                }
              });
          }
        });
    });
  }
  GetFilename(url) {
    if (url) {
      var m = url.toString().match(/.*\/(.+?)\./);
      if (m && m.length > 1) {
        return m[1];
      }
    }
    return "";
  }

  selectImage() {
    return new Promise((resolve) => {
      let actionSheet = this.actionSheetCtrl.create({
        title: "Select Image source",
        buttons: [
          {
            text: "Load from Library",
            handler: () => {
              return resolve(this.selectPicture());
            },
          },
          {
            text: "Use Camera",
            handler: () => {
              return resolve(this.takePicture());
            },
          },
          {
            text: "Cancel",
            role: "cancel",
          },
        ],
      });

      actionSheet.present();
    });
  }

  selectImagewithpdf() {
    return new Promise((resolve) => {
      let actionSheet = this.actionSheetCtrl.create({
        title: "Select Image source",
        buttons: [
          {
            text: "Load from Library",
            handler: () => {
              this.selectPicture().then((image) => {
                return resolve({ type: "base64", data: image });
              });
            },
          },
          {
            text: "Use Camera",
            handler: () => {
              this.takePicture().then((image) => {
                return resolve({ type: "base64", data: image });
              });
            },
          },
          {
            text: "Upload PDF",
            handler: () => {
              this.choosefile().then((image) => {
                return resolve({ type: "url", data: image });
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
    });
  }
  choosefile() {
    return new Promise((resolve, reject) => {
      this.fileChooser
        .open()
        .then((image) => {
          resolve(image);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
  selectPicture() {
    return new Promise((resolve) => {
      let options: CameraOptions = {
        quality: 50,
        destinationType: this.camera.DestinationType.DATA_URL,
        sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
        allowEdit: false,
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
        destinationType: this.camera.DestinationType.DATA_URL,
        mediaType: this.camera.MediaType.PICTURE,
        allowEdit: false,
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

  downloadvideo(url) {
    this.GetFilename(url); // Just call the method without storing result
    return this.androidPermissions
      .checkPermission(
        this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE
      )
      .then(
        (result) => {
          if (result.hasPermission) {
            // Add your download logic here using filem
            return true;
          }
          return false;
        },
        (err) => {
          console.error("Permission error:", err);
          return false;
        }
      );
  }
}
