import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { PlaidAccountService } from '../service/plaid-account.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  totalBalanace: string ;
  savings: string;
  checking: string;

  constructor(private plaidService: PlaidAccountService,private toastCtrl:ToastController) {
    this.totalBalanace = localStorage.getItem('total_balance');
    this.savings = localStorage.getItem('savings');
    this.checking = localStorage.getItem('checking');
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
  
  
}
