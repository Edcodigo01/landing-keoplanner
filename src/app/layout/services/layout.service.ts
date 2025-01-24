import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class LayoutService {
  public showNav: Observable<boolean> = of(false);
  public showMenu: Observable<boolean> = of(false);
  
  constructor(@Inject(PLATFORM_ID) private platform_id: any) {
    if (isPlatformBrowser(platform_id)){
      let oldConfigNavbar: boolean | any = localStorage.getItem(`keo-navbar`);
      this.showNav = of(oldConfigNavbar != null ? JSON.parse(oldConfigNavbar) : false);
    }
  }
}
