import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Storage} from '@ionic/storage';
import { File } from '@ionic-native/file';

/*
  Generated class for the CacheProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CacheProvider {

  constructor(public http: HttpClient,public storage: Storage,private file:File) {
    console.log('Hello CacheProvider Provider');
  }
  
  savehomepage(credentials,filem) {
 this.storage.set(filem, credentials);
return 0;
  }
  
   gethomepage(filem) {
	   return new Promise(resolve => {
      this.storage.get(filem).then(data => {
        resolve(data);
      });
    });
  }
  
   
 savehomepage3(credentials,filem) {
let filepath = this.file.applicationStorageDirectory+'filesdata/';
let filepathd = this.file.applicationStorageDirectory+'filesdata/';
	console.log(filepath,"filepath");
	console.log(filepathd,"filepath"+filem);
	///let filem =  'homepage.json';	 
	this.file.createDir(this.file.applicationStorageDirectory, 'filesdata', true).then(fileStr => {
		
		this.file.createFile(filepathd, 'filesdata/'+filem, false).then(de => { 
		
			this.file.writeFile(filepath, filem, credentials, {replace: true, append: false}).then(_ => {     ////       resolve(credentials); 
			}).catch(err => console.log(JSON.stringify(err)+' error while creating writeFile createDir succssfully'));
			
			
		}).catch(err => console.log(JSON.stringify(err)+' error while creating createFile createDir succssfully'));
		
		
	}).catch(err => {
		
		this.file.createFile(filepath, filem, true).then(de => { 
		
			this.file.writeFile(filepath, filem, credentials, {replace: true, append: false}).then(_ => {     ////       resolve(credentials); 
			}).catch(err => console.log(JSON.stringify(err)+'error while creating writeFile'));
			
			
	}).catch(err =>{ 
	console.log(err+'Directory doesn\'t exist');
   this.file.writeFile(filepath, filem, credentials, {replace: true, append: false}).then(_ => {     ////       resolve(credentials); 
			}).catch(err => console.log(JSON.stringify(err)+'error while creating writeFile'));
			} );
		console.log(JSON.stringify(err)+'error while creating writeFile');
		
	});
  }
  gethomepage3(filem) {
    return new Promise(resolve => {
      let filepath = this.file.applicationStorageDirectory+'filesdata/';
	  console.log(filepath,"filepath");
	  /// let filem =  'homepage.json';	 
	    this.file.readAsText(filepath, filem).then(fileStr => {
        resolve(JSON.parse(fileStr));
        }).catch(err => {
			console.log(err,"gethomepage");
        resolve(null);
       });
    });
  }





}
