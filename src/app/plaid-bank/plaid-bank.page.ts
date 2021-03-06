import { Component, OnInit } from '@angular/core';
import { NgxPlaidLinkService, PlaidConfig } from 'plaid-link-angular';
import { PlaidLinkHandler } from 'plaid-link-angular/lib/ngx-plaid-link-handler';
import { environment } from '../../environments/environment.prod';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { PlaidAccountService } from '../service/plaid-account.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-plaid-bank',
  templateUrl: './plaid-bank.page.html',
  styleUrls: ['./plaid-bank.page.scss'],
})
export class PlaidBankPage implements OnInit {
  private plaidLinkHandler: PlaidLinkHandler;
  private linkToken;
  
  private config: PlaidConfig;

  constructor(
    private plaidLinkService: NgxPlaidLinkService,
    private storage: Storage,
    private plaidService: PlaidAccountService,
    private toastCtrl:ToastController,
    private router:Router) { 
      this.linkToken = localStorage.getItem('link_token');
      this.config = {
        apiVersion: 'v2',
        env: 'sandbox',
        key: environment.plaid.sandbox,
        token: this.linkToken,
        webhook: "",
        product: ["auth"],
        countryCodes: ['US', 'CA', 'GB'],
        onSuccess: (token, metadata) => this.onSuccess(token, metadata),
        onExit: (error, metadata) => this.onExit(error, metadata),
        onEvent: (eventName, metadata) => this.onEvent(eventName, metadata)
      }
  }

  ngOnInit() {
  }

  async errorAlert(error){
    const toast = await this.toastCtrl.create({
      header: 'Error Occured',
      message: error,
      duration: 2000
    });
    toast.present();
  }

  ngAfterViewInit() {
    this.plaidLinkService
      .createPlaid(
        Object.assign({}, this.config, {
          onSuccess: (token, metadata) => this.onSuccess(token, metadata),
          onExit: (error, metadata) => this.onExit(error, metadata),
          onEvent: (eventName, metadata) => this.onEvent(eventName, metadata)
        })
      )
      .then((handler: PlaidLinkHandler) => {
        this.plaidLinkHandler = handler;
        this.open();
      });
  }

  open() {
    this.plaidLinkHandler.open();
  }

  exit() {
    this.plaidLinkHandler.exit();
  }

  onSuccess(token, metadata) {
    // console.log("We got a token:", token);
    // console.log("We got metadata:", metadata.public_token);
    localStorage.setItem('public_token',metadata.public_token);
    const postData = {
      public_token: metadata.public_token
    }
    this.plaidService.plaidSetAccessToken(postData).subscribe( res => {
      // console.log('Access ',res['access_token'])
      localStorage.setItem('access_token',res['access_token']);
      this.getAuth()
    }, err => {
      this.errorAlert(`Error occured ${err.status}`);
    });
    
  }

  onEvent(eventName, metadata) {
    console.log("We got an event:", eventName);
    console.log("We got metadata:", metadata);
  }

  onExit(error, metadata) {
    console.log("We exited:", error);
    console.log("We got metadata:", metadata);
  }

  getAuth() {
    this.plaidService.plaidGetAuth().subscribe( res => {
      console.log('Account ',res['accounts'][0].balances.available);
      localStorage.setItem('savings',res['accounts'][0].balances.available)
      localStorage.setItem('checking',res['accounts'][1].balances.available)
      localStorage.setItem('total_balance',res['accounts'][0].balances.available+res['accounts'][1].balances.available);
      this.router.navigateByUrl('/dashboard');
    }, err => {
      this.errorAlert(`Error occured ${err.status}`);
    });
  }

}
