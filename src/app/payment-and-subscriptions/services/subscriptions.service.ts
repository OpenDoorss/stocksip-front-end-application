import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {
  private baseUrl = environment.baseServerUrl;

  constructor(private http: HttpClient) {}

  subscribeToPlan(planId: number, accountId: number): Observable<any> {
    const url = `${this.baseUrl}${environment.subscriptionNewEndpointPath}`;
    return this.http.post<any>(url, { planId, accountId });
  }

  upgradeSubscription(planId: number, accountId: number): Observable<any> {
    const url = `${this.baseUrl}${environment.subscriptionsUpgradeEndpointPath}`;
    return this.http.post<any>(url, { planId, accountId });
  }

  completeSubscription(token: string, accountId: number, planId: number): Observable<any> {
    const url = `${this.baseUrl}${environment.subscriptionCompleteEndpointPath}`;
    const params = new HttpParams()
      .set('token', token)
      .set('accountId', accountId)
      .set('planId', planId);
    return this.http.get<any>(url, { params });
  }

  completeUpgrade(token: string, accountId: number, planId: number): Observable<any> {
    const url = `${this.baseUrl}${environment.subscriptionsUpgradeCompleteEndpointPath}`;
    const params = new HttpParams()
      .set('token', token)
      .set('accountId', accountId)
      .set('planId', planId);
    return this.http.get<any>(url, { params });
  }
}
