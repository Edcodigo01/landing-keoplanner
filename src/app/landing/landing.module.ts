import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { BusinessContainer } from './containers/business/business.container';
import { LandingContainer } from './containers/landing/landing.container';
import { LandingRoutingModule } from './landing-route.routing';
import { NgxCaptchaModule } from 'ngx-captcha';
import { TermsConditionsContainer } from './containers/terms-conditions/terms-conditions.container';
import { PolicyPrivacyContainer } from './containers/policy-privacy/policy-privacy.container';
import { PricesContainer } from './containers/prices/prices.container';

@NgModule({
  imports: [
    CommonModule,
    LandingRoutingModule,
    SharedModule,
    NgxCaptchaModule,
    LandingContainer,
    // BusinessContainer,
    TermsConditionsContainer,
    PolicyPrivacyContainer,
    PricesContainer,
  ],
})
export class LandingModule {}
