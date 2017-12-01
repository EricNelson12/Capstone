import { Component, OnInit } from '@angular/core';
import { CookieService } from 'angular2-cookie/core';
import { FormsModule} from '@angular/forms';

import { ItemService } from '../services/item.service';
import { Item } from '../models/item';

@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.css']
})

export class UploaderComponent implements OnInit {
 
   user:string;
   msg = '';
   msg2 = '';
   date = new Date();

  item: Item = {
  	title: '',
  	description: '',
  }


  constructor(private itemService: ItemService,private cookieService:CookieService) {
    this.user = this.cookieService.get('username'); 
  }

  ngOnInit() {

  }

  onSubmit(){
    this.msg = "";
    
    if(this.item.title == ''){
      this.msg = "Please fill in the title";
    }else if(this.item.description == ''){
      this.msg = "Please fill in the Descripton";
    }else if(this.item.permissions == null){
      this.msg = "Please select the permissions";
    }
    else{
       this.msg = "";
       this.item.time = this.date+'';
       this.item.adminposted = this.user;

     this.msg2 = "Posted to firebase!";
     this.itemService.addItem(this.item);
    }

  }


}
