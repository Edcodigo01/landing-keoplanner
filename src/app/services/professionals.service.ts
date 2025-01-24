import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { JsonResult } from '../shared/interfaces/json-result.interface';



@Injectable({
  providedIn: 'root',
})
export class ProfessionalsService {
  private headers = new HttpHeaders({ Accept: 'application/json' });
  private url: string;

  constructor(private _http: HttpClient) {
    this.url = `${environment.serv_url}/api/webservices`;
  }

  getFormats(slug_business: string = ''): Observable<any> | any {
    let query = '';
    if (slug_business) {
      query = `?slug_business=${slug_business}`;
    }
    return this._http.get<JsonResult>(
      `${this.url}/services.formats/list-formats${query}`,
      { headers: this.headers }
    );
  }
}
