import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class pushService {

    constructor(private http: HttpClient) {
    }

    private sendPush(body: any) {
        let Serverkey = 'key=AAAAfYzHNcI:APA91bHCtUqHEzkybxQYLLFkOMDbwXRBwCUR1j77KsCfGakY6fTg8WOaLtuG7Yvnifa73SsGNnHlYIQpVV__Meii9znK4Rr0YnkWdnD6O5R8MP4KNOZewAfs0-_ocvtFQl0FC6P8wYwd';
        let url = 'https://fcm.googleapis.com/fcm/send';
        this.http.post(url, body, {
            headers: new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', Serverkey)

        }).subscribe(
            data => {
                console.log('success', data);
            },
            error => { console.log('Error', error); }
            );
    }


    sendPushData() {
       let body = {
            "to": "/topics/update",
            "content_available": true,
            "data" : {
                "title":"Background Data"
            }
        }
        this.sendPush(body);
    }

    sendPushNotification(title: String, topic: String, msg: String, color: String) {
        let body =
            {
                "to": "/topics/" + topic,
                "content_available": true,
                "notification": {
                    "body": msg,
                    "title": title,
                    "color": color,
                    "click_action": "helloworld",
                    "icon": "notification_default",
                    "sound": "default",
                    "priority": "high",
                    "badge": 1
                }
            };
        this.sendPush(body);

    }
}