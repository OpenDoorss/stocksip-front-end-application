import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map, Observable} from 'rxjs';
import { UrgentRestockAlert, ExpiringProduct, BackendAlert } from '../model/alert.entity';
import { environment } from '../../../environments/environment';

/**
 * Service responsible for managing alerts and notifications
 * Handles urgent restock alerts and product expiration notifications
 */
@Injectable({ providedIn: 'root' })
export class AlertService {
  private readonly apiUrl = environment.baseServerUrl;

  constructor(private http: HttpClient) {}

  /**
   * Get all alerts from the backend for a specific account
   * @param accountId The account ID to get alerts for
   * @returns Observable of backend alerts
   */
  getAlerts(accountId: string): Observable<BackendAlert[]> {
    return this.http.get<BackendAlert[]>(`${this.apiUrl}/accounts/${accountId}/alerts`);
  }

  /**
   * Get a specific alert by ID
   * @param alertId The alert ID
   * @returns Observable of the specific alert
   */
  getAlertById(alertId: string): Observable<BackendAlert> {
    return this.http.get<BackendAlert>(`${this.apiUrl}/alerts/${alertId}`);
  }

  /**
   * Get stock alerts from backend alerts
   * @param accountId The account ID
   * @returns Observable of stock alerts
   */
  getStockAlerts(accountId: string): Observable<BackendAlert[]> {
    return this.getAlerts(accountId).pipe(
      map(alerts => alerts.filter(alert => alert.type === 'PRODUCTLOWSTOCK'))
    );
  }

  /**
   * Get expiration alerts from backend alerts
   * @param accountId The account ID
   * @returns Observable of expiration alerts
   */
  getExpirationAlerts(accountId: string): Observable<BackendAlert[]> {
    return this.getAlerts(accountId).pipe(
      map(alerts => alerts.filter(alert => alert.type === 'EXPIRATION_WARNING'))
    );
  }

  // Legacy methods for backward compatibility
  // These will be deprecated once the new backend integration is fully implemented

  private getProducts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/products`).pipe(
      map(products => {
        console.log('Productos obtenidos:', products);
        return products;
      })
    );
  }

  // Generar alertas de reposición
  getUrgentRestocks(): Observable<UrgentRestockAlert[]> {
    return this.getProducts().pipe(
      map(products => {
        const filteredProducts = products.filter(product => product.current <= product.min);
        console.log('Productos con bajo stock:', filteredProducts);
        return filteredProducts.map(product => new UrgentRestockAlert(
          product.id,
          product.name,
          product.current,
          product.min
        ));
      })
    );
  }

  // Generar alertas de vencimiento
  getUpcomingExpirations(daysThreshold: number = 7): Observable<ExpiringProduct[]> {
    const today = new Date();
    return this.getProducts().pipe(
      map(products => {
        const filteredProducts = products.filter(product => {
          const expirationDate = new Date(product.expirationDate);
          const diffTime = expirationDate.getTime() - today.getTime();
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          return diffDays <= daysThreshold;
        });
        console.log('Productos próximos a vencer:', filteredProducts);
        return filteredProducts.map(product => new ExpiringProduct(
          product.id,
          product.name,
          Math.ceil((new Date(product.expirationDate).getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
        ));
      })
    );
  }
}
