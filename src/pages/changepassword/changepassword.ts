import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ServicesProvider } from '../../providers/services/services';
import { IntroPage } from '../intro/intro';

/**
 * Generated class for the ChangepasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-changepassword',
  templateUrl: 'changepassword.html',
})
export class ChangepasswordPage {
  new_pass:any='';
  confirm_pass:any='';
  user_info:any={};
  login_error:any='';

  constructor(public navCtrl: NavController, public navParams: NavParams,private services:ServicesProvider) {
     this.user_info =this.navParams.get('result');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChangepasswordPage');
  }
  forgotpassword()
  {
    if(this.new_pass=='')
    {
          this.login_error ='Please Enter New Password';
          return;
    }
    if(this.confirm_pass=='')
    {
      this.login_error ='Please Enter Confirm Password';
      return;
    }
    if(this.new_pass!=this.confirm_pass)
    {
      this.login_error ='New Password and Confirm Password does not match';
      return;
    }
      let loading = this.services._loader_content();
      loading.present();
    let credentials = {user_id:this.user_info.user_id,new_password:this.new_pass};  
    this.services.commonfunction(credentials,'register/changepassword').then((result: any) => {
       this.services.simplealert('Successfull','Password Change Successfully, try login with new password');
       this.navCtrl.setRoot(IntroPage);
      loading.dismiss();
   }, (err) => {
   console.log(err);
   loading.dismiss();
     });	 
  }

}
