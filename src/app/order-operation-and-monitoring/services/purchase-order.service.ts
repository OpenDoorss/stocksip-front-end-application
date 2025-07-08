import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { PurchaseOrder } from '../model/purchase-order.entity';

@Injectable({
  providedIn: 'root'
})
export class PurchaseOrderService {
  private apiUrl = `${environment.apiUrl}/purchase-orders`;
  private baseUrl = `${environment.baseServerUrl}/orders`;

  constructor(private http: HttpClient) {}

  createPurchaseOrder(payload: any): Observable<PurchaseOrder> {
    return this.http.post<PurchaseOrder>(this.baseUrl, payload);
  }


  getAll(): Observable<PurchaseOrder[]> {
    return this.http.get<PurchaseOrder[]>(this.baseUrl);
  }

  updateStatus(id: number, status: string) {
    const enc = encodeURIComponent(status);   // evita espacios sin problema
    return this.http.patch(
      `${this.baseUrl}/${id}/status?status=${enc}`,
      null                    // <- cuerpo vacío
    );
  }




}
