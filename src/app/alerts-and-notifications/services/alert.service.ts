import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map, Observable} from 'rxjs';
import { UrgentRestockAlert, ExpiringProduct } from '../model/alert.entity';
import { environment } from '../../../environments/environment';

interface Product {
  id: number;
  name: string;
  current: number;
  min: number;
  expirationDate: string;
}

/**
 * Service responsible for managing alerts and notifications
 * Handles urgent restock alerts and product expiration notifications
 */
@Injectable({ providedIn: 'root' })
export class AlertService {
  private readonly apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  private getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/products`).pipe(
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
