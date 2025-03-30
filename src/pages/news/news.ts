import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ServicesProvider } from '../../providers/services/services';
import { WebviewPage } from '../webview/webview';

/**
 * Generated class for the NewsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-news',
  templateUrl: 'news.html',
})
export class NewsPage {
  coursed:any=[];
    img_url:any='';
  hidef:boolean=false;
  category_id:any=0;
  title:any='Latest News & Updates';
  constructor(public navCtrl: NavController, public navParams: NavParams,private services:ServicesProvider) {

    if(this.navParams.get('category_id')!=undefined)
    {
this.category_id =2;
this.title = 'Current Affairs';
    }
    this.getWallet();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewsPage');
  }
  opennewsdetail(n)
  {
     this.navCtrl.push(WebviewPage,{url:'webapi/blog/getblogdetail/'+n.blog_slug,'title':n.blog_title});
  }
  getWallet()
    {
     
    let data ={category_id:this.category_id};
      this.services.commonfunction(data,'blog').then((result: any) => {
        this.hidef=true;
                 if(result.message!=undefined){
          if(result.message=='ok'){
            
            this.coursed = result.result;
             this.img_url=result.blog_url;
             }
        }      
      },(error)=>{
        this.hidef=true;
      });
    }
}
