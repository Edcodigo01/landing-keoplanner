import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { LoaderBaseComponent } from '../../../shared/components/keo-loaders/loader-base/loader-base.component';
import { NotRegisterComponent } from '../../../shared/components/not-register/not-register.component';
import { RouterLink } from '@angular/router';
import { JsonResult } from '../../../shared/interfaces/json-result.interface';
import { ReservationService } from '../../../shared/services/reservation.service';


@Component({
  selector: 'keo-business',
  templateUrl: './business.container.html',
  styleUrls: ['./business.container.scss'],
  standalone: true,
  imports: [RouterLink, NotRegisterComponent, LoaderBaseComponent],
})
export class BusinessContainer implements OnInit {
  public readonly BASE_TRANSLATE_SHARED = 'shared';

  business: any[] = [];

  itemsForRows: number = 24;
  currentPage: number = 1;

  start: number = 0;
  end: number = 0;
  total: number = 0;
  totalPage: number = 1;

  loading: boolean = false;
  loadServiceSearch: boolean = false;

  constructor(
    private reservationService: ReservationService,
    private translate: TranslateService,
    private alert: MessageService
  ) {}

  ngOnInit(): void {
    this.listBusiness();
  }

  public get canPreview(): boolean {
    return this.current === 1;
  }

  public get canNext(): boolean {
    return this.current >= this.totalPage;
  }

  public get current(): number {
    return this.currentPage;
  }

  onClickPaginate(el: string) {
    if (el === 'preview') {
      this.currentPage--;
    }

    if (el === 'next') {
      this.currentPage++;
    }

    this.listBusiness();
  }

  listBusiness() {
    this.loading = true;
    this.business = [];
    this.reservationService
      .listBusiness(this.currentPage, this.itemsForRows)
      .subscribe(
        (trae: JsonResult) => {
          this.business = trae.retObject.data;

          this.start = trae.retObject.from;
          this.end = trae.retObject.to;
          this.total = trae.retObject.total;
          this.totalPage = trae.retObject.last_page;

          this.loading = false;
        },
        (err: any) => {
          if (err.error?.retMessage) {
            this.alert.add({
              severity: 'error',
              summary: this.translate.instant(
                `${this.BASE_TRANSLATE_SHARED}.message.fail`
              ),
              detail: err.error.retMessage,
            });
          }
          this.loading = false;
        }
      );
  }
}
