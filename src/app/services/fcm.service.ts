import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FcmService {

  constructor(
    private http: HttpClient,
  ) { }

  header() {
    return new HttpHeaders({
      "Content-Type": "application/json",
      "Authorization": "key=AAAAh-X2bS0:APA91bEIMSru3E3qYDpgbQB7YwpiN_oCh-Q7JlEnIzYpTsTYEtt5OnqUOPRnsWDjmOCDtzi-xNbI4BeqQOsnDYvWMwWEehdTeIJrGqfM9O33tpisN2DQZPeCUbyursru3UZjW0-WECpZ"
    })
  }

  sendMessage(title, body, token) {
    const data =
    {
      // "to": "dOXA6Hlm_r8:APA91bF8YZWoHQmz8VSmsR3Cohv4N_UepnndcUQtqqwFS4z7iMqflhZfrkx7ZFwhNJTkvht9iBIxAnBxPQp-dpFUuy_tckaAx_a1vCNcQOWY0cYpPEvHwVR18H6xqpmJUwEHFN9Z54e6",
      "to": token,
      "notification": {
        "title": title,
        "body": body,
        "sound": "default",
        "click_action": "FCM_PLUGIN_ACTIVITY",
        "icon": "fcm_pudh_icon"
      },
      "data": {
        "fcm_from": "io.ionic.starter",
        "priority": "high"
      }
    }

    return this.http.post<any>('https://fcm.googleapis.com/fcm/send', data, {headers: this.header()});
  }
}
