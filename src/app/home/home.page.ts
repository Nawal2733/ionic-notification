import { Component } from '@angular/core';
import { FcmService } from '../services/fcm.service';
import { FCM } from 'cordova-plugin-fcm-with-dependecy-updated/ionic/ngx';


class Form{
  constructor(
    public title: string,
    public body: string,
  ){}
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    private fcmService: FcmService,
    private fcm: FCM,
  ) {}

  formModel = new Form('', '');

  title = "Title of the message"
  body = "Body of the message"
  token = ''

  sendNotification() {
    this.fcm.getToken().then(token => {
      console.log("FCM Token",token);
      this.token = token
      // send token to the server
      this.fcmService.sendMessage(this.title, this.body, this.token).subscribe(
        res => {
          console.log(res);
          this.fcm.onNotification().subscribe(data => {
            console.log("response data", data);
            alert(data.title);
            if (data.wasTapped) {
              console.log('Received in background');
            } else {
              console.log('Received in foreground');
            }
          });
        },
        error => {
          console.log(error);
        }
      ) 
    });
  }

}
