import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'moment/locale/es';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { JsonResult } from '../interfaces/json-result.interface';


@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  private headers = new HttpHeaders({ Accept: 'application/json' });
  url: string = '';

  constructor(private _http: HttpClient) {
    this.url = `${environment.serv_url}/api/webservices`;
  }

  listBusiness(page: number, itemsForRows: number): Observable<any> | any {
    return this._http.get<JsonResult>(
      `${this.url}/services.external/list-business/${page}/${itemsForRows}/`,
      { headers: this.headers }
    );
  }
}
