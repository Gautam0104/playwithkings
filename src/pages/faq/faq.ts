import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { DomSanitizer } from '@angular/platform-browser';
import { ServicesProvider } from '../../providers/services/services';
/**
 * Generated class for the FaqPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-faq',
  templateUrl: 'faq.html',
})
export class FaqPage {
  my_url:any='appfaq';
  my_iframe_url:any='';
  hidef:boolean=false;
  constructor(public navCtrl: NavController, public navParams: NavParams,private sanitize: DomSanitizer,private services:ServicesProvider) {
      this.my_iframe_url =  this.sanitize.bypassSecurityTrustResourceUrl(this.services.WEB_URL+''+this.my_url);
 setTimeout(()=>{
       this.hidef=true;
     },2000); 
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FaqPage');
  }

}
