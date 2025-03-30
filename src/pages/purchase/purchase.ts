import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ServicesProvider } from '../../providers/services/services';
import { OrderdetailPage } from '../orderdetail/orderdetail';

/**
 * Generated class for the PurchasePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-purchase',
  templateUrl: 'purchase.html',
})
export class PurchasePage {
  user_info:any={};
  hidef:boolean=false;
  cart_data:any=[];
  constructor(public navCtrl: NavController, public navParams: NavParams,private services:ServicesProvider) {
    this.services.getuser().then((userloc)=>{
      console.log(userloc,"userlac");

            if(userloc != null && userloc != undefined ) {
              this.user_info =userloc;
              console.log( this.user_info," this.user_info");
             this.getmypurchase();
            }     
        });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PurchasePage');
  }

  openorder(order)
  {

this.navCtrl.push(OrderdetailPage,{order:order});
  }
  getproductname(data)
  {
    let  d:any=[];
    data.forEach(element => {
      d.push(element.td_name);
    });
    return d.join(', ');
  }
  getmypurchase()
  {

   
   let credentials:any={user_id:this.user_info.student_id};
   this.services.commonfunction(credentials,"orders/").then((result: any) => {         
       if(result.message=='ok')
      {
       this.cart_data =result.result;
      }
      this.hidef =true;
    }, (err) => { 
   console.log(err); 
   this.hidef =true;
    });
  }
}
