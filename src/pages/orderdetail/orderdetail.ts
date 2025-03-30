import { Component, NgZone } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { ServicesProvider } from "../../providers/services/services";
import { File } from "@ionic-native/file";
import { FileTransfer } from "@ionic-native/file-transfer";
import { FileOpener } from "@ionic-native/file-opener";
import { AndroidPermissions } from "@ionic-native/android-permissions";

/**
 * Generated class for the OrderdetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-orderdetail",
  templateUrl: "orderdetail.html",
})
export class OrderdetailPage {
  order_data: any = {};
  order_detail: any = [];
  item_total: any = 0;
  user_data: any = {};
  url: any = "";
  static_path: any = "";
  category_url: any = "";
  progress: any = 0;
  offlinedata: any = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private services: ServicesProvider,
    private file: File,
    private transfer: FileTransfer,
    private fileOpener: FileOpener,
    private androidPermissions: AndroidPermissions,
    public _zone: NgZone
  ) {
    this.order_data = this.navParams.get("order");
    this.static_path = this.file.applicationStorageDirectory + "training_pdf/";
    this.getuserdata();
  }

  checkfileexist(filem) {
    let f = filem;
    console.log(filem, "filem");
    let st = 0;
    this.file
      .checkFile(this.static_path, f)
      .then((files) => {
        st = 1;
        console.log(files, "files");
      })
      .catch((err) => {
        console.log("files not found ");
        st = 0;
      });
    return st;
  }

  updateUrl(ev, d) {
    let clsu = document.getElementsByClassName("odimg_" + d);

    console.log(ev, "ev.src");
    clsu[0].innerHTML = '<img src="assets/imgs/banner03.jpg">';
  }

  open(cat) {
    let link =
      this.static_path + this.GetFilename(cat.ecom_product.product_pdf);
    this.fileOpener
      .open(link, "application/pdf")
      .then(() => console.log("File is opened"))
      .catch((e) => console.log("Error opening file" + link, e));
    /*this.document.viewDocument(link, 'application/pdf', {
      title: 'My PDF'
    });
    */
  }

  selectpdfwhennotdownload(video) {
    console.log(video.ecom_product.product_pdf);

    this.download(video);
  }

  download(studymaterial) {
    this.androidPermissions
      .checkPermission(
        this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE
      )
      .then((status) => {
        if (status.hasPermission) {
          this.downloadVideo(studymaterial);
        } else {
          this.androidPermissions
            .requestPermission(
              this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE
            )
            .then((status) => {
              if (status.hasPermission) {
                this.downloadVideo(studymaterial);
              }
            });
        }
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

  downloadVideo(studymaterial) {
    let link = this.category_url + "" + studymaterial.ecom_product.product_pdf;
    let path = "";
    let dir_name = "training_pdf";
    let file_name = studymaterial.ecom_product.product_pdf;
    let encryted_file = file_name;
    let obj = this;
    const fileTransfer = this.transfer.create();
    let result = this.file.createDir(
      this.file.applicationStorageDirectory,
      dir_name,
      true
    );
    result.then((resp) => {
      path = resp.toURL();
      fileTransfer.onProgress((progressEvent) => {
        obj._zone.run(() => {
          var perc = Math.floor(
            (progressEvent.loaded / progressEvent.total) * 100
          );
          this.progress = perc;
          if (perc >= 100) {
            let data = {
              pd_title: studymaterial.ecom_product.product_title,
              pd_type: "pdf",
              pd_file_name: encryted_file,
            };
            //// this.fileEncryption.encrypt(path + encryted_file, 'manishgargneon#01');
            this.offlinedata.push(data);
            this.services.savedownloads(this.offlinedata);
          }
        });
      });
    });
    console.log(link, "path + encryted_file");
    console.log(path + encryted_file, "link");

    fileTransfer.download(link.trim(), path + encryted_file).then(
      (entry) => {
        let d = entry.toURL();
        console.log(d);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad OrderdetailPage");
  }

  getuserdata() {
    this.services.getuser().then((user) => {
      let userdata: any = { student_id: 0 };
      userdata = user;
      if (userdata != null && userdata.student_id != undefined) {
        this.user_data = user;
        this.loadorders();
      }
    });
  }

  loadorders() {
    let credentials = {
      user_id: this.user_data.student_id,
      order_id: this.order_data.trans_id,
    };
    let loading = this.services._loader_content();
    loading.present();
    this.services.commonfunction(credentials, "orders/getorderdetail").then(
      (result: any) => {
        loading.dismiss();
        if (result.message == "ok") {
          this.order_detail = result.result;
          let t: any = [];
          this.order_detail.forEach((Item) => {
            console.log(Item.ecom_product, "Item.ecom_product");
            if (
              Item.ecom_product != null &&
              Item.ecom_product.product_id != undefined
            ) {
              console.log(Item.ecom_product, "Item.ecom_productdf");
              console.log(
                this.checkfileexist(Item.ecom_product.product_pdf),
                "this.checkfileexist(Item.ecom_product.product_pdf)"
              );
              if (this.checkfileexist(Item.ecom_product.product_pdf) == 1) {
                Item["d_st"] = 1;
                console.log(Item.ecom_product, "Item.ecom_productdsdsdsf");
              } else {
                Item["d_st"] = 0;
                console.log(Item.ecom_product, "Item.ecom_productdsddsdsf");
              }
            } else {
              Item["d_st"] = 0;
            }

            t.push(Item);
          });
          //// this.order_detail  =t;
          console.log(t, "t");
          this.order_detail = [];
          this.order_detail = t;
          console.log(this.order_detail, "this.order_detail");
          this.item_total = this.getitemtotal();
          this.category_url = result.product_url;
        }
      },
      (err) => {
        console.log(err);
        loading.dismiss();
      }
    );
  }

  getitemtotal() {
    let t = 0;
    this.order_detail.forEach((Item) => {
      t += Item.td_total_amt;
    });
    return t;
  }
}
