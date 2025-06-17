import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { PurchaseOrder } from '../model/purchase-order.entity';

@Injectable({
  providedIn: 'root'
})
export class PurchaseOrderService {
  private apiUrl = `${environment.apiUrl}/purchase-orders`;

  constructor(private http: HttpClient) {}

  createPurchaseOrder(order: PurchaseOrder): Observable<any> {
    return this.http.post(this.apiUrl, order);
  }

  getAll(): Observable<PurchaseOrder[]> {
    return this.http.get<PurchaseOrder[]>(this.apiUrl);
  }

  update(id: number, order: PurchaseOrder): Observable<PurchaseOrder> {
    return this.http.put<PurchaseOrder>(`${this.apiUrl}/purchase-orders/${id}`, order);
  }

}
