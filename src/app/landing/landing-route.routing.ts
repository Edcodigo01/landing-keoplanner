import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingContainer } from './containers/landing/landing.container';
import { PolicyPrivacyContainer } from './containers/policy-privacy/policy-privacy.container';
import { PricesContainer } from './containers/prices/prices.container';
import { TermsConditionsContainer } from './containers/terms-conditions/terms-conditions.container';

const routes: Routes = [
  {
    path: '',
    component: LandingContainer
  },
  {
    path: 'policy-privacy',
    component: PolicyPrivacyContainer
  },
  {
    path: 'terms-conditions',
    component: TermsConditionsContainer
  },
  {
    path: 'plans',
    component: PricesContainer
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LandingRoutingModule {}
