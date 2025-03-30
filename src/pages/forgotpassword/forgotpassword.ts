import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ServicesProvider } from '../../providers/services/services';
import { OtpPage } from '../otp/otp';
import { CallNumber } from '@ionic-native/call-number';
import { InAppBrowser } from '@ionic-native/in-app-browser';

/**
 * Generated class for the ForgotpasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-forgotpassword',
  templateUrl: 'forgotpassword.html',
})
export class ForgotpasswordPage {
  user_email:any='';
  loginErrorMsg:any='';
  callbacknumber:any="";
  constructor(public navCtrl: NavController,
     public navParams: NavParams,public services: ServicesProvider,private callNumber:CallNumber,private iab:InAppBrowser) {
       this.loginwithemailpass();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgotpasswordPage');
  }

  loginwithemailpass()
  {
 
  this.loginErrorMsg=''; 
  let credentials = {};  
  let loading =  this.services._loader_content();
  loading.present();
  this.services.commonfunction(credentials,'register/getcallnumber').then((result: any) => {
  loading.dismiss();	
    this.callbacknumber =result.number;
  }, (err) => {
  console.log(err);
  loading.dismiss();
  });	 
  }
  
  forgotpassword()
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
  this.services.commonfunction(credentials,'register/forgot').then((result: any) => {
  loading.dismiss();	
  if(result.message=='ok')
  {
   this.navCtrl.push(OtpPage,{fromd:'forgot',results:result.results});
  }else{
  this.loginErrorMsg=result.notification; 
  }
  }, (err) => {
  console.log(err);
  loading.dismiss();
  });	 
  }
  opencall()
  {
this.callNumber.callNumber(this.callbacknumber, true)
.then(res => console.log('Launched dialer!', res))
.catch(err => console.log('Error launching dialer', err));
  }
  openyoutube()
  {

    this.iab.create("https://www.youtube.com/watch?v=gLfCUYuss8I","_system");
  }
}
