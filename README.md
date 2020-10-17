# ionic-notofication
1. Install all the dependencies
<pre>
---> ionic cordova plugin add cordova-plugin-fcm-with-dependecy-updated
---> npm install --save @ionic-native/fcm
</pre>

2. In app.module.ts import FCM and also write in provider
<pre>
import { FCM } from 'cordova-plugin-fcm-with-dependecy-updated/ionic/ngx'
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule],
  providers: [
    StatusBar,
    SplashScreen,
    FCM,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
</pre>

3. In app.component.ts
<pre>
import { FCM } from 'cordova-plugin-fcm-with-dependecy-updated/ionic/ngx';

initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.fcm.getToken().then(token => {
        console.log("FCM Token",token);
        // send token to the server
      });
      this.fcm.onNotification().subscribe(data => {
        console.log(data);
        if (data.wasTapped) {
          console.log('Received in background');
        } else {
          console.log('Received in foreground');
        }
      });
    });
  }
  
  </pre>
  
  build android and go to firebase and run the cloud messaging
  <pre>
  --> Go to firebase project Click on setting icon
  --> click on cloud messaging
  --> Add server key
  
  --> Now scroll sidebar and click on Grow -> cloud messaging
  --> click on New Notification
  --> Enter title and body 
  --> click on send test message
  --> provide the fcm token key
  </pre>
  Before it app run background 
