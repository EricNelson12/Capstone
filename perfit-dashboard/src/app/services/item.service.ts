
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase';

import { Item } from '../models/item';
import { Upload } from '../models/upload';
import { CookieService, CookieOptions } from 'angular2-cookie/core';


@Injectable()
export class ItemService{
	

	
	// path for the files
  	basePath = 'uploads';
	
	urltest = '';

	itemsCollection: AngularFirestoreCollection<Item>;
	items: Observable<Item[]>;
	itemDoc: AngularFirestoreDocument<Item>;

	constructor(private cookieService:CookieService, public afs: AngularFirestore){
		//returns the collection as an observable
		//this.items = this.afs.collection('items').valueChanges();

		this.itemsCollection = this.afs.collection('items',ref => ref.orderBy('time','desc'));

		//this code returns the id vs top code doesnt
		this.items = this.itemsCollection.snapshotChanges().map(changes =>{
			return changes.map(a =>{
				const data = a.payload.doc.data() as Item;
				data.id = a.payload.doc.id
				return data;
			});
		});
		
	}
	
	getItems(){
		return this.items;
	}

	addItem(item: Item){
		this.itemsCollection.add(item);
	}

	deleteItem(item: Item){
		this.itemDoc = this.afs.doc(`items/${item.id}`);
		this.itemDoc.delete();
	}

	updateItem(item: Item){
		this.itemDoc = this.afs.doc(`items/${item.id}`);
		this.itemDoc.update(item);
	}

	deleteFileStorage(name: string) {
    const storageRef = firebase.storage().ref();
    storageRef.child(`${this.basePath}/${name}`).delete()
    }

 

//https://firebasestorage.googleapis.com/v0/b/perfitdental-7951d.appspot.com/o/uploads%2FIMG_2246.JPG?alt=media&token=1462a689-71e8-4e49-a554-f7255952b54f
}