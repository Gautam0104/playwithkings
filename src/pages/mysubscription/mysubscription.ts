import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ServicesProvider } from '../../providers/services/services';
import * as moment from 'moment';

/**
 * Generated class for the MysubscriptionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mysubscription',
  templateUrl: 'mysubscription.html',
})
export class MysubscriptionPage {
inputkey:any='';
login_error_message:any='';
user_data:any={};
orders:any=[];
  constructor(public navCtrl: NavController, public navParams: NavParams,private services:ServicesProvider) {
	  this.getuserdata();
  }
 getuserdata()
 {
	 this.services.getuser().then((user) => {
		  let userdata:any={student_id:0};
		 userdata = user;
		 if(userdata!=null && userdata.student_id!=undefined)
		 {
			 this.user_data = user; 
 			 this.loadorders();
 		 } 
	  });  
 }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MysubscriptionPage');
  }
  
  loadorders()
{
	let credentials = {user_id:this.user_data.student_id};  
 let loading =  this.services._loader_content();
 loading.present();
this.services.commonfunction(credentials,"package/getsubscription").then((result: any) => {
loading.dismiss();	
if(result.message=='ok')
{
this.orders = 	result.result; 	
}
}, (err) => {
console.log(err);
loading.dismiss();
});	
	
}

unlockdata()
{
	if(this.inputkey=='')
	{
		this.login_error_message = 'Please Enter Subscription Key';
		return false;
	}
	
}
changedateformat(dated)
{
	return moment(dated).format('DD,MMM YYYY');
	
}
changetimeformat(dated)
{
	return moment(dated).format('HH:MM');
	
}
}
