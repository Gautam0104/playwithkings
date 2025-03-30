import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams,Events } from 'ionic-angular';
import { ServicesProvider } from '../../providers/services/services';
import { TabsPage } from '../tabs/tabs';
import { ChangepasswordPage } from '../changepassword/changepassword';

 
/**
 * Generated class for the OtpPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-otp',
  templateUrl: 'otp.html',
})
export class OtpPage {
  @ViewChild('myInput') myInput;
  @ViewChild('myInput1') myInput1;
  @ViewChild('myInput2') myInput2;
  @ViewChild('myInput3') myInput3;
user_data:any={};
digi1:any='';
digi2:any='';
digi3:any='';
digi4:any='';
registerErrorMsg:any='';
fromd:any='';
otpdirect:any=0;
  constructor(public navCtrl: NavController, public navParams: NavParams,public services: ServicesProvider,public events: Events) {
    this.user_data  =this.navParams.get('results');
	this.otpdirect =this.navParams.get("otpdirect");

	if(this.otpdirect==1)
	{

		this.digi1 = this.user_data.user_otp.substr(0,1);
		this.digi2 = this.user_data.user_otp.substr(1,1);
		this.digi3 = this.user_data.user_otp.substr(2,1);
		this.digi4 = this.user_data.user_otp.substr(3,1);
		this.verifyotp();

	}
    if(this.navParams.get('fromd'))
    {
        this.fromd =this.navParams.get('fromd');
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OtpPage');
  }
 

focust(st)
{
	if(st==1)
	{
	  this.myInput1.setFocus();
	}
if(st==2)
	{
	  this.myInput2.setFocus();
	}
	if(st==3)
	{
	  this.myInput3.setFocus();
	}
	
	if(st==4)
	{
		if(this.digi1=='')
	{
			  this.myInput.setFocus();
			  return false;
	}else 	if(this.digi2=='')
	{
			  this.myInput1.setFocus();
			  			  return false;

	}else 	if(this.digi3=='')
	{
			  this.myInput2.setFocus();
			  			  return false;

	}else 	if(this.digi4=='')
	{
			  this.myInput3.setFocus();
			  			  return false;

	}else{
		
		this.verifyotp();
	}
	}
}
verifyotp()
{
	if(this.digi1=='')
	{
			  this.myInput.setFocus();
			  return false;
	}
	if(this.digi2=='')
	{
			  this.myInput1.setFocus();
			  			  return false;

	}
	if(this.digi3=='')
	{
			  this.myInput2.setFocus();
			  			  return false;

	}
	if(this.digi4=='')
	{
			  this.myInput3.setFocus();
			  			  return false;

	}
	let otp = this.digi1+''+this.digi2+''+this.digi3+''+this.digi4;
	 let loading = this.services._loader_content();
	        let credentials = {user_id:this.user_data.user_id,user_otp:otp};
 			loading.present();

     this.services.commonfunction(credentials,'register/verifyotp').then((result: any) => {         
	 	       loading.dismiss();
			   if(result.message=='ok')
			   { 
           if(this.fromd=='')
           {
            this.events.publish('user_playonlinesatta:created', result.results, Date.now());
            this.services.saveuser(result.results);
            this.navCtrl.setRoot(TabsPage);
           }else{
            this.navCtrl.setRoot(ChangepasswordPage,{result:result.results});
           }       
			   }else{
				  this.registerErrorMsg = result.notification; 
				   
			   }
      }, (err) => { 
        console.log(err); 
    });
}
setresendbutton()
{
	 let loading = this.services._loader_content();
	        let credentials = {user_id:this.user_data.user_id};
 			loading.present();

     this.services.commonfunction(credentials,"register/resendotp").then((result: any) => {         
	 	       loading.dismiss();
     this.services.presentToast(result.notification);
      }, (err) => { 
        console.log(err); 
    });
	
}

}
