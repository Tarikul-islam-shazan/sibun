import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CashCardPage } from './cash-card.page';

const routes: Routes = [
  {
    path: '',
    component: CashCardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CashCardPageRoutingModule {}
