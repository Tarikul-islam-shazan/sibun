import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { AuthenticationService } from '../service/authentication.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  userName: string;
  personName: string;

  constructor(
    private authService: AuthenticationService,
    private router:Router,
    private storage: Storage,
    private toastCtrl:ToastController) {}

   async getProfileStorage() {
    this.personName = await this.storage.get('person-name');
    this.userName = await this.storage.get('user-name');
   }

   async errorAlert(error){
    const toast = await this.toastCtrl.create({
      header: 'Error Occured',
      message: error,
      duration: 2000
    });
    toast.present();
  }


  async successAlert(msg){
    const toast = await this.toastCtrl.create({
      header: 'Sucesss',
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  ngOnInit() {
    this.getProfileStorage();
  }

  logOut(){
    this.authService.logOut('').subscribe(async (res: any)=>{
      if(res.message){
        await this.storage.remove('token');
        localStorage.clear();
        await this.storage.remove('person-name');
        await this.storage.remove('user-name');
        this.router.navigateByUrl('/login');
        this.successAlert(res.message);
      }
    },err => {
      this.errorAlert(err.status);
    })
  }

}
