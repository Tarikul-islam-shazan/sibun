import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CashCardPageRoutingModule } from './cash-card-routing.module';

import { CashCardPage } from './cash-card.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CashCardPageRoutingModule
  ],
  declarations: [CashCardPage]
})
export class CashCardPageModule {}
