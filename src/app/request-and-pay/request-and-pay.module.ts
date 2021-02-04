import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RequestAndPayPageRoutingModule } from './request-and-pay-routing.module';

import { RequestAndPayPage } from './request-and-pay.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RequestAndPayPageRoutingModule
  ],
  declarations: [RequestAndPayPage]
})
export class RequestAndPayPageModule {}
