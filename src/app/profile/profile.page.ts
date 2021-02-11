import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../service/authentication.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  userName: string;
  personName: string;

  constructor(private authService: AuthenticationService) {
    this.personName = localStorage.getItem('person-name');
    this.userName = localStorage.getItem('user-name');
   }

  ngOnInit() {
  }

  // logOut(){
  //   this.authService.logOut('').subscribe((res)=>{
  //     console.log(res)
  //   },err => {
  //     console.log("error",err);
  //   })
  // }

}
