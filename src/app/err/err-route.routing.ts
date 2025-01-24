import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Err404Container } from './containers/err-404/err-404.container';
import { ErrBusinessDeleteContainer } from './containers/err-business-delete/err-business-delete.container';
import { ErrBusinessSuspendedContainer } from './containers/err-business-suspended/err-business-suspended.container';

const routes: Routes = [
  {
    path: '404',
    component: Err404Container
  },
  {
    path: 'business/suspended',
    component: ErrBusinessSuspendedContainer
  },
  {
    path: 'business/delete',
    component: ErrBusinessDeleteContainer
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ErrRoutingModule {}
