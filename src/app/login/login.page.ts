import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthenticationService } from '../service/authentication.service';
import { PlaidAccountService } from '../service/plaid-account.service';
import { Storage } from '@ionic/storage-angular';
import { PlaidLinkToken } from '../model/plaidLinkToken.interface';
import { NgxPlaidLinkService, PlaidConfig } from 'plaid-link-angular';
import { PlaidLinkHandler } from 'plaid-link-angular/lib/ngx-plaid-link-handler';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;
  private plaidLinkHandler: PlaidLinkHandler;
  private linkToken;
  private config: PlaidConfig;

  constructor(
    private router:Router,
    private formBuilder:FormBuilder, 
    private authenticationService: AuthenticationService, 
    private plaidService: PlaidAccountService,
    private plaidLinkService: NgxPlaidLinkService,
    private storage: Storage,
    private toastCtrl:ToastController) { }

 ngOnInit() {
    this.initializLoginForm();
  }

  initializLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ['',[Validators.required,Validators.email]],
      password: ['',Validators.required,],
    });
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

   login(){
    const postData = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    }
    this.authenticationService.logIn(postData).subscribe( async (res)=>{
      try {
        await this.storage.set('token',res.tokenData.token);
        localStorage.setItem('token',res.tokenData.token);
        await this.storage.set('person-name',res.firstName+' '+res.lastName);
        await this.storage.set('user-name','$'+res.firstName);
        this.callPlaidLinkToken();
      } catch (e) {
        this.errorAlert('Some thing went wrong');
      }
    },(err)=> {
      if(err.status == 400){
        this.errorAlert('Email already exist');
      } else {
        this.errorAlert(`Error occured ${err.status}`);
      }
    })
  }

  callPlaidLinkToken() {
    this.plaidService.plaidCreateLinkToken().subscribe( (res:PlaidLinkToken) => {
      try {
        localStorage.setItem('link_token', res.link_token);
        this.successAlert('Log in Sucessful');
        this.plaidLinkInitalization();
      } catch (e) {
        this.errorAlert('Login Page: Storage not set');
      }
    }, err => {
      this.errorAlert(`Error occured ${err.status}`);
    })
  }

  setPlaidService() {
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


  plaidLinkInitalization() {
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
    this.setPlaidService();
  }

  open() {
    this.plaidLinkHandler.open();
  }

  exit() {
    this.plaidLinkHandler.exit();
  }

  onSuccess(token, metadata) {
    localStorage.setItem('public_token',metadata.public_token);
    const postData = {
      public_token: metadata.public_token
    }
    this.plaidService.plaidSetAccessToken(postData).subscribe( res => {
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
      this.router.navigateByUrl('/dashboard');
    });
  }

}
