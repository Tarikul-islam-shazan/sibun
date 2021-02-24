import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { PlaidAccountService } from '../service/plaid-account.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private plaidService: PlaidAccountService,private toastCtrl:ToastController) {
    
  }

  ngOnInit() {
    // this.getAccount();
  }

  async errorAlert(error){
    const toast = await this.toastCtrl.create({
      header: 'Error Occured',
      message: error,
      duration: 2000
    });
    toast.present();
  }

  // getAccount() {
  //   console.log('Access token',localStorage.getItem('access_token'));
  //   const ACCESS_TOKEN = localStorage.getItem('access_token').toString();
  //   const postData = {
  //     access_token: ACCESS_TOKEN
  //   };
  //   this.plaidService.plaidGetAccount(postData).subscribe( res => {
  //     console.log('Account ',res)
  //   }, err => {
  //     this.errorAlert(`Error occured ${err.status}`);
  //   });

  
}
