import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlaidBankPage } from './plaid-bank.page';

const routes: Routes = [
  {
    path: '',
    component: PlaidBankPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlaidBankPageRoutingModule {}
