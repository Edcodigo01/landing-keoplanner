import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { JsonResult } from "../interfaces/json-result.interface";

@Injectable({
    providedIn: "root"
})
export class LandingService {
    private headers = new HttpHeaders({ 'Accept': 'application/json' });
    private url: string;

    constructor(
        private _http: HttpClient
    ) {
        this.url = `${environment.serv_url}/landing/api/webservices`;
    }

    sendMessage(data: any): Observable<any> | any {
        return this._http.post<JsonResult>(`${this.url}/services.landing/contact/send_message`, data, { headers: this.headers });
    }

}