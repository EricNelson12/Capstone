import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import {pushService} from '../services/push.service';

import { Router } from '@angular/router';
import { CookieService, CookieOptions } from 'angular2-cookie/core';


@Component({
  selector: 'app-pushmessage',
  templateUrl: './pushmessage.component.html',
  styleUrls: ['./pushmessage.component.css']
})
export class PushmessageComponent implements OnInit {

  onChange: any;
  title:"";
  msg:"";
  results:"";
  topic:"";
  color:'#bdf105';


  options = [{'name': 'Dental Professional','topic':'prof'}, {'name': 'Everyone','topic':'news'}];
  selectedOption = this.options[0]; 

  constructor(private http: HttpClient, private push:pushService,
    private cookieService:CookieService, 
    private router: Router
  
  ){
  }

  ngOnInit() {    
    this.color = '#bdf105';

    if(this.cookieService.get('guest') == "true"){
      this.router.navigate(['guestpost']);
    }
  } 

  onSubmit(){   
    console.log(this.title);    
  }  
  
  sendPushNotification() {

    this.push.sendPushNotification(this.title,this.selectedOption.topic,this.msg,this.color)
    alert("Push Notification Sent!");
    this.title = "";
    this.msg = "";
  }

}
