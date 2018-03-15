import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
import { ItemService } from '../services/item.service';
import { Item } from '../models/item';
import { MarkdownService } from '../services/markdown.service';
import { FileuploadService } from '../services/fileupload.service';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { Router } from '@angular/router';
import { CookieService, CookieOptions } from 'angular2-cookie/core';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
 
  nItems: any;
  basePath = 'uploads';
  items: Item[];
  editState: boolean = false;
  itemToEdit: Item;
  convertedText: string;
  imageurl: any;
  name:string;

  item: Item = {
    title: '',
    description: '',
    url: '',
    name: '',
  }

  constructor(
    private cookieService:CookieService, 
    private itemService: ItemService, 
    private md:MarkdownService,
    private router: Router) {

   }


  ngOnInit() {
    if(this.cookieService.get('guest') == "true"){
      this.router.navigate(['guestpost']);

      
    }


    this.itemService.getItems().subscribe(items => {
      this.items = items;
    })


  }


   updateOutput(mdText: string){
    this.convertedText = this.md.converted(mdText);
  }


  updateItem(item: Item){
    this.itemService.updateItem(item);
    this.clearState;
    alert("post updated!");
    this.clearState();
  }



  deleteItem(event,item: Item){
    this.clearState();
    this.itemService.deleteItem(item);
    alert("post deleted!");
    
    this.deleteFileStorage(item);      

    //this.deleteFileStorage("IMG_2227.JPG");      
  }

  deleteFileStorage(item: Item) {
    const storageRef = firebase.storage().ref();
    storageRef.child(`${this.basePath}/${item.name}`).delete()

    alert(item.name);
    }


  ddeleteFileStorage(event,item: Item) {
    const storageRef = firebase.storage().ref();
    storageRef.child(`${this.basePath}/${item.name}`).delete()

    alert(item.name);
    }



  editItem(event,item: Item){
    this.editState = true;
    this.itemToEdit = item;
  }
  
  clearState(){
    this.editState = false;
    this.itemToEdit = null;
  }

}