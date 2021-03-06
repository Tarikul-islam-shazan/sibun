import { Component, OnInit } from '@angular/core';
import { PlaidAccountService } from '../service/plaid-account.service';
import * as moment from 'moment';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.page.html',
  styleUrls: ['./transaction.page.scss'],
})
export class TransactionPage implements OnInit {
  // today = new Date('YYYY-MM-DD');

  transaction: any;
  todayTransaction: any;
  yesterdayTransaction: any;
  loading: any;

  constructor(private plaidService: PlaidAccountService,public loadingController: LoadingController) { }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Please wait...'
    });
    await this.loading.present();
  }

  async dismissLoading() {
    return await this.loading.dismiss();
  }

  ngOnInit() {
    this.presentLoading();
    this.plaidService.plaidGetTransaction().subscribe(res => {
     this.dismissLoading();
      const today = moment();
      const yesterday = moment().subtract(1,'day');
      // console.log(res['transactions']);
      this.transaction = res['transactions'].filter(tr => !moment(today).isSame(tr.date,'day'));
      this.todayTransaction = res['transactions'].filter(tr => moment(today).isSame(tr.date,'day'));
      this.yesterdayTransaction = res['transactions'].filter(tr => moment(yesterday).isSame(tr.date,'day'));
    },err => {

    });
  }

}
