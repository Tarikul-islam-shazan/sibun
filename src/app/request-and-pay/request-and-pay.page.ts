import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-request-and-pay',
  templateUrl: './request-and-pay.page.html',
  styleUrls: ['./request-and-pay.page.scss'],
})
export class RequestAndPayPage implements OnInit {
  amount:string = '0.00';
  private flag = 0;

  constructor() { }

  ngOnInit() {
  }

  updateAmount(num: string){
    if(num === '.'){
      this.flag = this.flag + 1;
    }
    if(num === 'x'){
      if(this.amount.length === 1){ 
        this.flag =  0 ;
        this.amount = '0.00';
      } else {
        this.amount =  this.amount.substr(0,this.amount.length-1); // discard number
      }
    } else {
      num = (this.flag > 1 && num === '.') ? '': num;
      this.amount = (this.amount == '0.00') ?   num : (this.amount + '' + num ) ;
    }
  }

}
