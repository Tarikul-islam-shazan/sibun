import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardTabsPage } from './dashboard-tabs.page';

const routes: Routes = [
  {
    path: '',
    component: DashboardTabsPage,
    children: [
      {
        path:'home',
        children:[
          {
            path: '',
            loadChildren:() => import('../home/home.module').then(m => m.HomePageModule)
          }
        ]
      },
      {
        path: 'cash-card',
        children: [
          {
            path: '',
            loadChildren: () => import('../cash-card/cash-card.module').then(m => m.CashCardPageModule)
          }
        ]
      },
      {
        path: 'request-and-pay',
        children: [
          {
            path: '',
            loadChildren: () => import('../request-and-pay/request-and-pay.module').then(m => m.RequestAndPayPageModule)
          }
        ]
      },
      {
        path: 'transaction',
        children: [
          {
            path: '',
            loadChildren: () => import('../transaction/transaction.module').then(m => m.TransactionPageModule)
          }
        ]
      },
      {
        path: 'profile',
        children: [
          {
            path:'',
            loadChildren: () => import('../profile/profile.module').then(m => m.ProfilePageModule)
          }
        ]
      },
      {
        path:'**',
        redirectTo: 'home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path:'**',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardTabsPageRoutingModule {}
