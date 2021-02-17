import { Component, OnInit } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { ModalController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
})
export class SplashPage implements OnInit {
  width: number = 320;
  height: number = 200;

  constructor(private modalCtrl: ModalController,private platform: Platform) { 
    this.width = platform.width();
    this.height = platform.height();
  }

  ngOnInit() {
    this.loadSplashVideo();
  }

  loadSplashVideo(){
    const { SplashScreen } = Plugins;
    setTimeout(()=>{
      SplashScreen.hide();
      this.modalCtrl.dismiss();
    }, 5000)
  }

}
