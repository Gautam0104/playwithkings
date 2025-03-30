import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { DomSanitizer } from '@angular/platform-browser';
import { ServicesProvider } from '../../providers/services/services';
/**
 * Generated class for the WebviewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-webview',
  templateUrl: 'webview.html',
})
export class WebviewPage {
  my_iframe_url:any='';
  my_url:any='';
  hidef:boolean=false;
  title:any='';
  constructor(public navCtrl: NavController, public navParams: NavParams,private sanitize: DomSanitizer,private services:ServicesProvider) {
   this.my_url =this.navParams.get('url');
   this.title =this.navParams.get('title');
   this.my_iframe_url =  this.sanitize.bypassSecurityTrustResourceUrl(this.services.WEB_URL+''+this.my_url);
setTimeout(()=>{
			this.hidef=true;
		},2000); 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WebviewPage');
  }

}
