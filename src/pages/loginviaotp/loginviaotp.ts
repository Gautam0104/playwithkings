import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

  import { RegisterPage } from '../register/register';
import { ServicesProvider } from '../../providers/services/services';
import { OtpPage } from '../otp/otp';

/**
 * Generated class for the LoginviaotpPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-loginviaotp',
  templateUrl: 'loginviaotp.html',
})
export class LoginviaotpPage {
   user_email:any='';
  loginErrorMsg:any='';
  constructor(public navCtrl: NavController, public navParams: NavParams,public services: ServicesProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginviaotpPage');
  }
  signup()
  {

    this.navCtrl.push(RegisterPage);

  }
  openloginviaotp()
  {
    this.navCtrl.pop();
  }
  loginWithMobile()
  {
  if(this.user_email=='')
  {
  this.loginErrorMsg = 'Please Enter Email id / Mobile Number';
  return;
  }  
   
  this.loginErrorMsg=''; 
  let credentials = {student_phone :this.user_email};  
  let loading =  this.services._loader_content();
  loading.present();
  this.services.commonfunction(credentials,'register/loginWithMobile').then((result: any) => {
  loading.dismiss();	
  if(result.message=='ok')
  {
   this.navCtrl.push(OtpPage,{results:result.results});
  }else{
  this.loginErrorMsg=result.notification; 
  }
  }, (err) => {
  console.log(err);
  loading.dismiss();
  });	 
  }
}
