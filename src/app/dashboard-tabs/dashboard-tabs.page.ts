import { Component, OnInit, ViewChild } from '@angular/core';
import { IonTabBar, IonTabButton, IonTabs } from '@ionic/angular';

@Component({
  selector: 'app-dashboard-tabs',
  templateUrl: './dashboard-tabs.page.html',
  styleUrls: ['./dashboard-tabs.page.scss'],
})
export class DashboardTabsPage implements OnInit {
  @ViewChild('requestAndPay',{static: true}) requestAndPay: IonTabs;

  constructor() { }

  ngOnInit() {
  }

  activeRequestAndPayTab(){
    console.log(this.requestAndPay);
    this.requestAndPay.select('request-and-pay') ;
  }

}
