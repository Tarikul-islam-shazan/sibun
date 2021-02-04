import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RequestAndPayPage } from './request-and-pay.page';

const routes: Routes = [
  {
    path: '',
    component: RequestAndPayPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RequestAndPayPageRoutingModule {}
