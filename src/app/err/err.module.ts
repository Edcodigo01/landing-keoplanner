import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';


import { ErrRoutingModule } from './err-route.routing';
import { Err404Container } from './containers/err-404/err-404.container';
import { ErrBusinessSuspendedContainer } from './containers/err-business-suspended/err-business-suspended.container';
import { ErrBusinessDeleteContainer } from './containers/err-business-delete/err-business-delete.container';

@NgModule({
    imports: [CommonModule, ErrRoutingModule, Err404Container, ErrBusinessSuspendedContainer, ErrBusinessDeleteContainer],
})
export class ErrModule { }
