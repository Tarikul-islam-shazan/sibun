import { Component } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { Plugins } from '@capacitor/core';
import { SplashPage } from './splash/splash/splash.page';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(private platform: Platform,private modalCtrl: ModalController) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      if(this.platform.is('capacitor')){
        const { StatusBar } = Plugins;
        this.openSplashModal()
        StatusBar.setBackgroundColor({color:'#00c06b'});
        StatusBar.setOverlaysWebView({
          overlay: true
        });
        StatusBar.show();
      }
    });
  }

  async openSplashModal(){
    const splashModal = await this.modalCtrl.create({
      component: SplashPage
    });
    await splashModal.present();
  }
}
