import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,ViewController} from 'ionic-angular';
import { ServicesProvider } from '../../providers/services/services';

/**
 * Generated class for the OfferPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-offer',
  templateUrl: 'offer.html',
})
export class OfferPage {
  user_data:any={};
  offercelist:any=[];
  from:any='';
  selected_coupon:any={};
  error_message:any='';
  coupon_code:any='';
  cartamount:any=0;
  pack_id:any=0;
  book_id:any='';
  book_qty:any='';
  hidef:boolean=false;
    constructor(public navCtrl: NavController, public navParams: NavParams,private services:ServicesProvider,private viewCtrl:ViewController) {
      
      if(this.navParams.get('from')!=undefined)
      {
        this.from = this.navParams.get('from');
        this.cartamount = this.navParams.get('cartamount');
      }
      
      if(this.navParams.get('pack_id')!=undefined)
      {
      this.pack_id = this.navParams.get('pack_id');  	  
      } 
      if(this.navParams.get('book_id')!=undefined)
      {
      this.book_id = this.navParams.get('book_id');  	  
      this.book_qty = this.navParams.get('qty');  	  
      }
      this.services.getuser().then((user) => {
       this.user_data = user; 
       this.getWallet();
      }); 
    }
    closeModal()
    {
      this.viewCtrl.dismiss({selected_coupon:this.selected_coupon});
    
    }
  
    ionViewDidLoad() {
      console.log('ionViewDidLoad OffercePage');
    }
   getWallet()
    {
     
    let data ={user_id:this.user_data.student_id};
      this.services.commonfunction(data,'dashboard/getofferce').then((result: any) => {
        this.hidef=true;
                 if(result.message!=undefined){
          if(result.message=='ok'){
            
            this.offercelist = result.result;
             
          }
        }      
      },(error)=>{
        this.hidef=true;
      });
    }
  applybyname()
  {
    if(this.coupon_code=='')
    {
      this.error_message = 'Please Enter Promocode';
      return false; 
    }
    let loading =  this.services._loader_content();
  
      loading.present();
    let data ={user_id:this.user_data.student_id,coupon_code:this.coupon_code,cartamount:this.cartamount,package_id:this.pack_id,book_qty:this.book_qty,book_id:this.book_id};
      this.services.commonfunction(data,'cart/updatetocartcouponbyname').then((result: any) => {
            loading.dismiss();
         
          if(result.message=='ok'){
            
            this.selected_coupon = result;
              this.error_message = '';
           this.closeModal();
        }else{
        this.error_message = result.notification;
      }      
      },(error)=>{
        loading.dismiss();
      });
  }
  applybyid(offerce)
  {
    this.coupon_code = offerce.coupon_code;
    this.applybyname();
    
  }

}
