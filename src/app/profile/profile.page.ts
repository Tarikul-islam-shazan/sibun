import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
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
    private toastCtrl:ToastController) {
    this.personName = localStorage.getItem('person-name');
    this.userName = localStorage.getItem('user-name');
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
  }

  logOut(){
    this.authService.logOut('').subscribe((res: any)=>{
      console.log(res.message)
      if(res.message){
        localStorage.clear();
        this.router.navigateByUrl('/login');
        this.successAlert(res.message);
      }
    },err => {
      console.log("error",err);
      this.errorAlert(err.status);
    })
  }

}
