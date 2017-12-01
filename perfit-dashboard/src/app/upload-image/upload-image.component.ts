import { CookieService } from 'angular2-cookie/core';
import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
//import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireDatabaseModule } from 'angularfire2/database';
//import * as firebase from 'firebase'


@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.css']
})
export class UploadImageComponent implements OnInit {

  constructor(private db:AngularFireDatabaseModule) { }


  ngOnInit() {
  }


  featuredPhotoSelected(event: any ){
  	const file: File = event.target.files[0];

  	const metaData = {'contentType': file.type};
  	const storageRef: firebase.storage.Reference = firebase.storage().ref('url1');
  	storageRef.put(file, metaData);


  	console.log("Uploading", file.name);


  }


}
