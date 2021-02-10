import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-request-and-pay',
  templateUrl: './request-and-pay.page.html',
  styleUrls: ['./request-and-pay.page.scss'],
})
export class RequestAndPayPage implements OnInit {

  amount:string = '0.00';

  constructor() { }

  ngOnInit() {
  }

  updateAmount(num: string){
    if(num === 'x'){
        this.amount =  this.amount.substr(0,this.amount.length-1); 
    }  else{
      this.amount = this.amount == '0.00' ?   num : (this.amount + '' + num ) ;
    }
    
    
  }

}
