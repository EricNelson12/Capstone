import { Component, OnInit } from '@angular/core';
import { CookieService, CookieOptions } from 'angular2-cookie/core';
import { FormsModule} from '@angular/forms';
import { ItemService } from '../services/item.service';
import { Item } from '../models/item';
import { MarkdownService } from '../services/markdown.service';
import { Upload } from '../models/upload';
import * as firebase from 'firebase';
import {pushService} from '../services/push.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.css']
})

export class UploaderComponent implements OnInit {
 
   basePath = 'uploads';
   uploadfile = '';

   user:string;
   date = new Date();
   convertedText: string;
   
   fileurl = '';
   filename = '';
  
  item: Item = {
  	title: '',
  	description: '',
    url: '',
    verified: '',
  }
  
  formsubmit: boolean;
  selectedFiles: FileList | null;
  currentUpload: Upload;

  constructor(
    private itemService: ItemService,
    private cookieService:CookieService, 
    private md:MarkdownService,
    private upSvc: ItemService,
    private push:pushService,
    private router: Router,
    ) {
    this.user = this.cookieService.get('username'); 
  }

  ngOnInit() {
    
    if(this.cookieService.get('guest') == "true"){
      this.router.navigate(['guestpost']);
    }
  }

 

  // updates markup text
  updateOutput(mdText: string){
    this.convertedText = this.md.converted(mdText);
  }

  detectFiles($event: Event) {
      this.selectedFiles = ($event.target as HTMLInputElement).files;
  }

  sendPush(){
    this.push.sendPushData();
    console.log("Sending Push");
  }
  
  public pushUpload(upload: Upload) {
    const storageRef = firebase.storage().ref();
    const uploadTask = storageRef.child(`${this.basePath}/${upload.file.name}`).put(upload.file);

    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot: firebase.storage.UploadTaskSnapshot) =>  {
        // upload in progress
        const snap = snapshot;
        upload.progress = (snap.bytesTransferred / snap.totalBytes) * 100
      },
      (error) => {
        console.log(error);  // upload failed
      },
      () => {
        // upload success
        if (uploadTask.snapshot.downloadURL) {
          upload.url = uploadTask.snapshot.downloadURL;
          upload.name = upload.file.name;
          

          this.uploadfile = upload.url;
          this.additem();
          //Send background update push notification
          this.push.sendPushData();
          return;
        } else {
          console.error('No download URL!');
        }
      },
    );
    } // end of pushUpload

  uploadSingle() {
    const file = this.selectedFiles;
   // if (file && file.length === 1) {
   //   this.currentUpload = new Upload(file.item(0));
   //   this.pushUpload(this.currentUpload);

   // } else {
      //console.error('No file found!');
   // }
  }

 

  onSubmit(){
    const file = this.selectedFiles;

    if(this.item.title == ''){
      alert("Please fill in the title");
    }else if(this.item.description == ''){
      alert("Please fill in the Descripton");
    }else if(this.item.permissions == null){
      alert("Please select the permissions");
    }else if(this.item.datatype == null){
      alert("Please select the datatype");
    }
    else{
         if (file && file.length === 1) {
         this.currentUpload = new Upload(file.item(0));
         this.pushUpload(this.currentUpload);       
      }
    }
  }


  additem(){
       this.item.time = this.date+'';
       this.item.adminposted = this.user;
       this.item.name =this.currentUpload.file.name;
       this.item.url =this.uploadfile; 
       this.item.verified = "Yes";
      console.log(this.currentUpload.file);
     
      this.itemService.addItem(this.item);
      alert("Posted to firebase!");
  }


}
