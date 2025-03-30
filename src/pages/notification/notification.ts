import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ServicesProvider } from '../../providers/services/services';

/**
 * Generated class for the NotificationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-notification',
  templateUrl: 'notification.html',
})
export class NotificationPage {
  user_data:any={};
  hidef:boolean=false;
  notifications:any=[];
  constructor(public navCtrl: NavController, public navParams: NavParams,private services:ServicesProvider) {
    this.getuserdata();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotificationPage');
  }
  getuserdata()
 {
 	 this.services.getuser().then((user) => {
		  let userdata:any={student_id:0};
		 userdata = user;
		 if(userdata!=null && userdata.user_id!=undefined)
		 {
			 this.user_data = user; 
 			 this.loadnotification();
 		 } 
	  });  
 }

 loadnotification()
{
	let credentials = {user_id:this.user_data.user_id};  
 this.services.commonfunction(credentials,"dashboard/notification").then((result: any) => {
 if(result.message=='ok')
{
this.notifications = 	result.result;
this.services.notificationcount =0; 
 }
this.hidef = true;
}, (err) => {
console.log(err);
this.hidef = true;
 });	
	
}
swipeLeft(ev,noti)
{
  this.hidef = false;

 	let credentials = {noti_id:noti.message_id,user_id:this.user_data.student_id};  
 this.services.commonfunction(credentials,"faq/deletenotification").then((result: any) => {
 if(result.message=='ok')
{
this.notifications = 	result.result; 	
}
this.hidef = true;

}, (err) => {
console.log(err);
this.hidef = true;
});	
	
}

}
