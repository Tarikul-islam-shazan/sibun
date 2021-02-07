import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { User } from '../model/user.interface';
import { AuthenticationService } from '../service/authentication.service';

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
      console.log(res);
      localStorage.setItem('token',res.tokenData.token);
      this.successAlert('Log in Sucessful');
      this.router.navigateByUrl('/dashboard');
    },(err)=> {
      console.log(err)
      if(err.status == 400){
        this.errorAlert('Email already exist');
      } else {
        this.errorAlert(`Error occured ${err.status}`);
      }
    })
  }

}
