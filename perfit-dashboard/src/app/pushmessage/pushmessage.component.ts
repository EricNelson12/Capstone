import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpHeaders} from '@angular/common/http';


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

 

  constructor(private http: HttpClient){
  }

  ngOnInit() {    
    this.color = '#bdf105';
  }

  

  onSubmit(){
   
    console.log(this.title);
    
  }

  
  
  sendPushNotification() {
    
    let Serverkey= 'key=AAAAfYzHNcI:APA91bHCtUqHEzkybxQYLLFkOMDbwXRBwCUR1j77KsCfGakY6fTg8WOaLtuG7Yvnifa73SsGNnHlYIQpVV__Meii9znK4Rr0YnkWdnD6O5R8MP4KNOZewAfs0-_ocvtFQl0FC6P8wYwd';
    let url = 'https://fcm.googleapis.com/fcm/send';
    let body = 
    {
      "to": "/topics/"+this.selectedOption.topic,
      "content_available": true,
      "notification" : {
          "body" : this.msg,
          "title" : this.title,
          "color" : this.color,
          "click_action": "helloworld",
          "icon": "notification_default",
          "sound" : "default",
    "priority": "high",
    "badge": 1
      }
  };
  
    this.http.post(url, body,{      
      headers: new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', Serverkey)
      
    }).subscribe(
      data => {
        console.log('success', data);
        alert("Push Notification Sent!");
        this.title = "";
        this.msg = "";
      
      },
      error => {console.log('Error', error);alert("Error sending push notification!")}
    );
  }

}
