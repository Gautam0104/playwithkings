import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ServicesProvider } from '../../providers/services/services';

/**
 * Generated class for the ViewmorecolorsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-viewmorecolors',
  templateUrl: 'viewmorecolors.html',
})
export class ViewmorecolorsPage {
  dataresult:any=[];
  user_info:any={};
  hidef:any=false;
  constructor(public navCtrl: NavController, public navParams: NavParams,private services:ServicesProvider) {
    this.services.getuser().then((userloc)=>{
      console.log(userloc,"userlac");

            if(userloc != null && userloc != undefined ) {
              this.user_info =userloc;
             this.gethome(0);
            }
          });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewmorecolorsPage');
  }
  getcolorresult(result)
  {
    let d:any='';
    if(result.period_status=="FINISHED")
{
  d=result.preiod_d_result;
let htmld:any="";
if(d==0)
{
  htmld ='<span class="tx-red mr-5"><img src="assets/icon/red.png" class="wd-16"></span><span class="tx-voilet"><img src="assets/icon/purple.png" class="wd-16"></span>';
}else if(d==5)
{
  htmld ='<span class="tx-green mr-5"><img src="assets/icon/greenc.png" class="wd-16"></span><span class="tx-voilet"><img src="assets/icon/purple.png" class="wd-16"></span>';
}else if(d==2 || d==4 || d==6 || d==8)
{
  htmld ='<span class="tx-red"><img src="assets/icon/red.png" class="wd-16"></span>';
}else if(d==1 || d==3 || d==7 || d==9)
{
  htmld ='<span class="tx-red"><img src="assets/icon/greenc.png" class="wd-16"></span>';
}
return htmld;
}
  }

  getresultdata(result)
  {
    
    let d:any='';
    if(result.period_status=="FINISHED")
    {
    d=result.preiod_d_result;
    }
    return d;
  }
  gethome(type)
  {
    let loading:any;
    loading = this.services._loader_content();
    loading.present();
    let credentials = {user_id:this.user_info.user_id};  
    this.services.commonfunction(credentials,'color/resulthistoryold').then((result: any) => {
      loading.dismiss();
    if(result.status==1)
    {
      this.dataresult =result.list; 
    }
    }, (err) => {
  console.log(err);
        loading.dismiss();
    });	 
  }

}
