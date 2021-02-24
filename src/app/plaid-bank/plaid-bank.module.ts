import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlaidBankPageRoutingModule } from './plaid-bank-routing.module';

import { PlaidBankPage } from './plaid-bank.page';
import { NgxPlaidLinkModule } from 'plaid-link-angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlaidBankPageRoutingModule,
    NgxPlaidLinkModule
  ],
  declarations: [PlaidBankPage]
})
export class PlaidBankPageModule {}
