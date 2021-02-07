import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../service/authentication.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { User } from '../model/user.interface';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {
  registrationForm: FormGroup;

  constructor(
    private authenticationService: AuthenticationService, 
    private formBuilder: FormBuilder,
    private router: Router, 
    private toastCtrl: ToastController) {}

  ngOnInit() {
    this.initializRegistrationForm();
  }

  initializRegistrationForm(){
    this.registrationForm = this.formBuilder.group({
      firstName: ['',[Validators.required,Validators.pattern('[a-zA-Z ]*')]],
      lastName: ['',[Validators.required,Validators.pattern('[a-zA-Z ]*')]],
      email: ['',[Validators.required,Validators.email]],
      password: ['',[Validators.required,Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')]],
      /**At least one upper case English letter, (?=.*?[A-Z])
      At least one lower case English letter, (?=.*?[a-z])
      At least one digit, (?=.*?[0-9])
      At least one special character, (?=.*?[#?!@$%^&*-])
      Minimum eight in length .{8,} (with the anchors)**/
      confirmPassword: ['',Validators.required]
    })
  }

  isPasswordMatched(): boolean{
    return (
      this.registrationForm.value.password === this.registrationForm.value.confirmPassword && 
      this.registrationForm.controls.confirmPassword.valid
    );
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

  register(){
    const postData = {
      firstName: this.registrationForm.value.firstName,
      lastName: this.registrationForm.value.lastName,
      email: this.registrationForm.value.email,
      password: this.registrationForm.value.password
    }
    this.authenticationService.signIn(postData).subscribe((res: User)=>{
      console.log(res);
      this.successAlert('Registration Sucessful');
      this.router.navigateByUrl('/login');
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
