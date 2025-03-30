import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { ServicesProvider } from '../../providers/services/services';
import { DatePicker } from '@ionic-native/date-picker';
import moment from 'moment';
import { ChangepasswordPage } from '../changepassword/changepassword';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  user_info:any={};
   cred:any = {user_first_name:'',student_last_name:'',user_email_id:'',user_mobile:'',student_dob:'',student_id:0};
   login_error:any='';
  constructor(public navCtrl: NavController, public navParams: NavParams,private services:ServicesProvider,
    private events:Events,private datePicker: DatePicker) {
    this.services.getuser().then((userloc)=>{
      console.log(userloc,"userlac");

            if(userloc != null && userloc != undefined ) {
              this.user_info =userloc;
              this.cred['user_first_name'] = this.user_info.user_first_name;
              this.cred['user_email_id'] = this.user_info.user_email_id;
              this.cred['user_mobile'] = this.user_info.user_mobile;
              this.cred['student_id'] = this.user_info.user_id;
            }     
        });
  }
  getdate()
  {
    this.datePicker.show({
      date: new Date(),
      mode: 'date',
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK
    }).then(
      date => this.setdate(date),
      err => console.log('Error occurred while getting date: ', err)
    );
  }

  changepassword()
  {

    this.navCtrl.push(ChangepasswordPage,{result:this.user_info});
  }
  setdate(date)
  {

    this.cred['student_dob'] = moment(date).format('YYYY-MM-DD');
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }
  updatedata()
  {
    if(this.cred['user_first_name']=='')
    {
     this.login_error ='Please Enter Full Name';
      return;
    }
    if(this.cred['user_email_id']=='')
    {
     this.login_error ='Please Enter Email Id';
      return;
    }
    if(this.cred['user_mobile']=='')
    {
     this.login_error ='Please Enter Phone Number';
      return;
    }
    
    this.cred['user_id'] = this.user_info.user_id;
    
    let loading = this.services._loader_content();
    loading.present();
    this.services.commonfunction(this.cred,'register/updateuserprofile').then((result: any) => {
     if(result.message=='ok')
  {

    this.events.publish('user_neon:created', result.results, Date.now());
    this.services.saveuser(result.results);
    this.services.simplealert('Successfull','Profile updated successfully')
    this.navCtrl.pop();

    }
  loading.dismiss();
  }, (err) => {
  console.log(err);
  loading.dismiss();
    });	 
  
  }

}
