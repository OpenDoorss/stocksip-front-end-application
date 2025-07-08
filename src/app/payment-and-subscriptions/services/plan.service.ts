import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PlanService {
  private baseUrl = environment.baseServerUrl;
  private plansEndpoint = environment.plansEndpointPath;
  private currentPlanEndpoint = environment.accountCurrentPlanEndpointPath;

  constructor(private http: HttpClient) {}

  getAllPlans(): Observable<any> {
    const url = `${this.baseUrl}${this.plansEndpoint}`;
    return this.http.get<any>(url);
  }

  getCurrentPlan(accountId: string): Observable<any> {
    const endpoint = this.currentPlanEndpoint.replace('{accountId}', accountId);
    const url = `${this.baseUrl}${endpoint}`;
    return this.http.get<any>(url);
  }
}
