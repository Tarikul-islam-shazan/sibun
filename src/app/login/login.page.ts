import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthenticationService } from '../service/authentication.service';
import { PlaidAccountService } from '../service/plaid-account.service';
import { Storage } from '@ionic/storage';
import { PlaidLinkToken } from '../model/plaidLinkToken.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup

  constructor(
    private router:Router,
    private formBuilder:FormBuilder, 
    private authenticationService: AuthenticationService, 
    private plaidService: PlaidAccountService,
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
    this.authenticationService.logIn(postData).subscribe((res)=>{
      // console.log(res);
      try {
        localStorage.setItem('token',res.tokenData.token);
        localStorage.setItem('person-name',res.firstName+' '+res.lastName);
        localStorage.setItem('user-name','$'+res.firstName);
        this.callPlaidLinkToken();
      } catch (e) {
        this.errorAlert('Some thing went wrong');
      }
      
    },(err)=> {
      // console.log(err)
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
        // console.log('Link-Token:',res.link_token)
        localStorage.setItem('link_token', res.link_token);
        this.successAlert('Log in Sucessful');
        this.router.navigateByUrl('/plaid-bank');
      } catch (e) {
        this.errorAlert('Login Page: Storage not set');
      }
    }, err => {
      this.errorAlert(`Error occured ${err.status}`);
    })
  }

}
