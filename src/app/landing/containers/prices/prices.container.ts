import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'keo-prices',
  templateUrl: './prices.container.html',
  styleUrls: ['./prices.container.scss'],
  standalone: true,
  imports: [RouterLink, NgClass],
})
export class PricesContainer implements OnInit {
  @ViewChild('top', { static: false }) top!: ElementRef;

  public readonly BASE_TRANSLATE_SHARED = 'shared';

  international: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.top.nativeElement.scrollIntoView({
        behavior: 'smooth',
      });
    });
  }

  goFreeTrial() {
    window.location.href = `${environment.uri_dashboard}/auth/signup`;
  }
}
