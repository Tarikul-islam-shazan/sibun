import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import{ Plugins } from '@capacitor/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(private platform: Platform) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      const {StatusBar,SplashScreen} = Plugins;
      SplashScreen.hide();
      StatusBar.setBackgroundColor({color:'#00c06b'});
      // Display content under transparent status bar (Android only)
      StatusBar.setOverlaysWebView({
        overlay: true
      });
      StatusBar.show();
     
    });
  }
}
