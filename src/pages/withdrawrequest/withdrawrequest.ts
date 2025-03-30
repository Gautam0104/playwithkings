import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import moment from 'moment';
import { ServicesProvider } from '../../providers/services/services';

/**
 * Generated class for the WithdrawrequestPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-withdrawrequest',
  templateUrl: 'withdrawrequest.html',
})
export class WithdrawrequestPage {
result_data:any={};
userInfo:any={};
min_therasold_amt:any=0;
cash_project:any=0;
error_message:any='';
user_payment_method:any='';
payment_share_message:any='';
user_payment_mobile:any='';
start_time:any='';
end_time:any='';


user_bank_account:any='';
user_bank_ifsc:any='';
user_bank_holdername:any='';
user_bank_account_conf:any='';


money_requested:any=[];

user_bank_name:any="";
  constructor(public navCtrl: NavController, public navParams: NavParams,private services:ServicesProvider) {
	  	  this.result_data =this.navParams.get('result_data');
 this.services.getuser().then((user)=>{
      console.log(user);
      if(user!=null)
      {
        this.userInfo = user;
	 	this.loaddashboard();
      }
    });
  }
  changedateformat(dated)
  {
    let d:any = dated.replace('+05:30','');
    return moment(d).format('DD,MMM YYYY');
    
  }
  changetimeformat(dated)
  {
    let d:any = dated.replace('+05:30','');
    d = d.replace('T',' ');
    return moment(d).format('hh:mm');
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad WithdrawrequestPage');
  }
loaddashboard()
{
	 let credentials = {user_id:this.userInfo.user_id};
      let loading = this.services._loader_content();
      loading.present();
      this.services.commonfunction(credentials,"dashboard/getwithdrawrequest").then((result: any) => { 
        loading.dismiss();
           if(result.message == 'ok') {
			  //	this.lotter_list = result.results;
		//		this.mylotter_list = result.resultsmy;
		this.min_therasold_amt = result.min_therasold_amt;
		this.payment_share_message = result.payment_share_message;
		this.result_data['balance'] = result.balance;
    this.start_time = result.theme_withdraw_start;
    this.end_time = result.theme_withdraw_end;
    this.money_requested = result.result;

            } 
        }, (err) => { 
        console.log(err); 
        });
	
}
getdata(getDate)
{
     var check = moment(getDate).isAfter();
      console.log(getDate, check);
    return check;
}

withdrawrequest()
{
	if(this.cash_project<=0)
	{
		this.error_message ='Please Enter Amount Greater than '+this.min_therasold_amt;
		return;
	}
	if(this.min_therasold_amt>this.cash_project)
	{
		this.error_message ='Please Enter Amount Greater than '+this.min_therasold_amt;
		return;
		
	}
	if(this.user_payment_method<=0)
	{
		
	this.error_message ='Please Select payment method';
		return;	
	}
 

 
	this.error_message  ="";
 
  if(this.user_payment_method==4)
  {

    
    if(this.user_bank_name=='')
    {
      
    this.error_message ='Please Bank Name';
      return;	
    }
    if(this.user_bank_account=='')
    {
      
    this.error_message ='Please Bank Account Number';
      return;	
    }
    
    if(this.user_bank_ifsc=='')
    {
      
    this.error_message ='Please IFSC Code';
      return;	
    }
    if(this.user_bank_holdername=='')
    {
      
    this.error_message ='Please Account Holder Name';
      return;	
    }
    if(this.user_bank_account_conf=='')
    {
      
    this.error_message ='Please Confirm account number';
      return;	
    }
    if(this.user_bank_account_conf!=this.user_bank_account)
    {
      
    this.error_message ='Account Number &  Confirm account number not match';
      return;	
    }
  }else  if(this.user_payment_mobile<=0)
	{
		
	this.error_message ='Please Mobile Number';
		return;	
	}

	let credentials = {user_id:this.userInfo.user_id,cash_project:this.cash_project,
    user_payment_method:this.user_payment_method,user_payment_mobile:this.user_payment_mobile,
    user_bank_account:this.user_bank_account,user_bank_ifsc:this.user_bank_ifsc,
    user_bank_holdername:this.user_bank_holdername,
    user_bank_account_conf:this.user_bank_account_conf,user_bank_name:this.user_bank_name};
     
    let loading = this.services._loader_content();
    loading.present();
    this.services.commonfunction(credentials,"dashboard/generatewithdrawrequest").then((result: any) => { 
    loading.dismiss();
    if(result.message == 'ok') {

    this.result_data['balance'] = result.balance;
    this.services.simplealert('Successful','Your withdraw request generated. Amount will reflect in your respective payment method.');
    this.navCtrl.pop();       
    }else{
    this.result_data['balance'] = result.balance;
    this.services.presentToast(result.notification);

    } 
    }, (err) => { 
    console.log(err); 
    });
}
}
