import { DOCUMENT, NgStyle, AsyncPipe } from '@angular/common';
import { Component, Inject, OnInit, afterRender } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { NgEventBus } from 'ng-event-bus';
import { ToastModule } from 'primeng/toast';
import { AuthService } from '../../../auth/services/auth.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.base.html',
  styleUrls: ['./auth.base.scss'],
  standalone: true,
  imports: [NgStyle, RouterOutlet, ToastModule, AsyncPipe],
})
export class AuthdBase implements OnInit {
  public initialized: boolean = false;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    public authService: AuthService,
    private router: Router,
    private eventBus: NgEventBus,
    private title: Title
  ) {
    afterRender(() => {
      if (this.authService._isLogin) {
        window.location.href = environment.redirectAfterLogin;
        // this.router.navigateByUrl('/dashboard');
      }
    });
  }

  ngOnInit(): void {
    this.title.setTitle(`Keo Planner`);

    let favicon = this.document.querySelector('#favicon-app');
    this.document.documentElement.removeAttribute('style');

    if (favicon) {
      favicon.setAttribute('href', 'favicon.ico');
    }

    this.eventBus.cast('loading:show', { loading: false, text: '' });
    this.eventBus
      .on('auth:token-expired')
      .subscribe(() =>
        this.authService.removeAuthenticated({ redirect_login: true })
      );
  }

  back() {
    this.router.navigateByUrl(this.authService.url_back);
  }
}
