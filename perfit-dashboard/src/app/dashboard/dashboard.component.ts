import { Component, OnInit } from '@angular/core';
import { CookieService } from 'angular2-cookie/core';
import * as firebase from 'firebase/app';

import { ItemService } from '../services/item.service';
import { Item } from '../models/item';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
 
  items: Item[];
  editState: boolean = false;
  itemToEdit: Item;
  constructor(private cookieService:CookieService, private itemService: ItemService ) {

   }


  ngOnInit() {

		this.itemService.getItems().subscribe(items => {
			//console.log(items);
			this.items = items;

		})
  }

  updateItem(item: Item){
    this.itemService.updateItem(item);
    this.clearState;
  }


  deleteItem(event,item: Item){
    this.clearState();
    this.itemService.deleteItem(item);
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

