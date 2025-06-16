import { Component, OnInit } from '@angular/core';
import { AlertService } from '../../services/alert.service';
import { UrgentRestockAlert, ExpiringProduct } from '../../model/alert.entity';
import { AlertListComponent } from '../../components/alert-list/alert-list.component';
import { HttpClient } from '@angular/common/http';
import {FormsModule} from '@angular/forms';

interface Product {
  id: number;
  name: string;
  current: number;
  min: number;
  expirationDate: string;
}

@Component({
  selector: 'app-alerts-and-notifications',
  templateUrl: './alerts.component.html',
  imports: [
    AlertListComponent,
    FormsModule
  ],
  styleUrls: ['./alerts.component.css']
})
export class AlertsComponent implements OnInit {
  urgentRestockAlerts: UrgentRestockAlert[] = [];
  upcomingExpirations: ExpiringProduct[] = [];
  products: Product[] = [];
  apiUrl = 'http://localhost:3000/products';
  settingsUrl = 'http://localhost:3000/settings/1';
  successMsg = '';
  errorMsg = '';
  loading = false;

  expirationAlertMargin = 7;
  showEditMarginModal = false;
  marginSuccessMsg = '';
  marginErrorMsg = '';
  marginLoading = false;

  constructor(private alertService: AlertService, private http: HttpClient) {}

  ngOnInit(): void {
    this.alertService.getUrgentRestocks().subscribe(data => this.urgentRestockAlerts = data);
    this.getUpcomingExpirations();
    this.fetchProducts();
    this.fetchExpirationAlertMargin();
  }

  fetchProducts() {
    this.http.get<Product[]>(this.apiUrl).subscribe({
      next: (data) => this.products = data,
      error: () => this.errorMsg = 'Error al cargar productos.'
    });
  }

  getUpcomingExpirations() {
    this.alertService.getUpcomingExpirations(this.expirationAlertMargin).subscribe(data => this.upcomingExpirations = data);
  }

  fetchExpirationAlertMargin() {
    this.http.get<{ id: number, expirationAlertMargin: number }>(this.settingsUrl).subscribe({
      next: (settings) => {
        this.expirationAlertMargin = settings.expirationAlertMargin;
        console.log('Margen actualizado desde backend:', this.expirationAlertMargin);
        this.getUpcomingExpirations();
      },
      error: () => this.marginErrorMsg = 'Error al cargar el margen de vencimiento.'
    });
  }

  updateMinStock(product: Product) {
    this.successMsg = '';
    this.errorMsg = '';
    if (product.min < 0) {
      this.errorMsg = 'El stock mínimo debe ser positivo.';
      return;
    }
    this.loading = true;
    this.http.patch(`${this.apiUrl}/${product.id}`, { min: product.min }).subscribe({
      next: () => {
        this.successMsg = 'Stock mínimo actualizado correctamente.';
        this.loading = false;
      },
      error: () => {
        this.errorMsg = 'Error al actualizar el stock mínimo.';
        this.loading = false;
      }
    });
  }

  openEditMarginModal() {
    this.showEditMarginModal = true;
    this.marginSuccessMsg = '';
    this.marginErrorMsg = '';
  }

  closeEditMarginModal() {
    this.showEditMarginModal = false;
  }

  saveExpirationAlertMargin() {
    this.marginSuccessMsg = '';
    this.marginErrorMsg = '';
    if (this.expirationAlertMargin < 1) {
      this.marginErrorMsg = 'El margen debe ser al menos 1 día.';
      return;
    }
    this.marginLoading = true;
    this.http.put(this.settingsUrl, { expirationAlertMargin: this.expirationAlertMargin }).subscribe({
      next: () => {
        this.marginSuccessMsg = 'Margen de vencimiento actualizado correctamente.';
        this.marginLoading = false;
        this.fetchExpirationAlertMargin();
      },
      error: () => {
        this.marginErrorMsg = 'Error al actualizar el margen de vencimiento.';
        this.marginLoading = false;
      }
    });
  }
}
