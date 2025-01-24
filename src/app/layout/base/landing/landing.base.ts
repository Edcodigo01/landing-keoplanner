import {
  DOCUMENT,
  NgClass,
  NgStyle,
  AsyncPipe,
  SlicePipe,
} from '@angular/common';
import { Component, Inject, OnInit, afterRender } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { NgEventBus } from 'ng-event-bus';
import { TranslateModule } from '@ngx-translate/core';
import { ToastModule } from 'primeng/toast';
import { KeoWhatsappChatComponent } from '../../../shared/components/keo-whatsapp-chat/keo-whatsapp-chat.component';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.base.html',
  styleUrls: ['./landing.base.scss'],
  standalone: true,
  imports: [
    RouterLink,
    NgClass,
    NgStyle,
    RouterOutlet,
    KeoWhatsappChatComponent,
    ToastModule,
    AsyncPipe,
    SlicePipe,
    TranslateModule,
  ],
})
export class LandingBase implements OnInit {
  public readonly BASE_TRANSLATE_ROL = 'shared.rols';

  public initialized: boolean = false;
  public markRegister: boolean = false;

  isLogin: boolean = false;
  avatar: string = '';
  info: any = null;

  showNavigation: boolean = false;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private eventBus: NgEventBus,
    private router: Router,
    private title: Title
  ) {
    afterRender(() => {
      if (!this.document.querySelector('#marketing-cf')) {
        let body = this.document.getElementsByTagName('body')[0];
        let script = this.document.createElement('script');
        script.id = 'marketing-cf';
        script.async;
        script.src =
          'https://d335luupugsy2.cloudfront.net/js/loader-scripts/2363c170-0160-4283-944c-45501a5ca0a7-loader.js';
        body.appendChild(script);
      }
    });
  }

  ngOnInit(): void {
    this.title.setTitle(`Keo Planner`);

    let favicon = this.document.querySelector('#favicon-app');

    if (favicon) {
      favicon.setAttribute('href', 'favicon.ico');
    }
  }

  goToConocenos() {
    this.router.navigateByUrl('/');
    setTimeout(() => {
      this.eventBus.cast('goto:conocenos');
    }, 200);
  }

  goToPreguntas() {
    this.router.navigateByUrl('/');
    setTimeout(() => {
      this.eventBus.cast('goto:pregunta');
    }, 200);
  }

  goToContact() {
    this.router.navigateByUrl('/');
    setTimeout(() => {
      this.eventBus.cast('goto:contact');
    }, 200);
  }

  goDashboard() {
    window.location.href = `${environment.uri_dashboard}/auth/login`;
  }
}
