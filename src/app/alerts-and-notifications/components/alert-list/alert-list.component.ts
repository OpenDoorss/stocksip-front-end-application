import { Component, Input, Output, EventEmitter } from '@angular/core';
import { UrgentRestockAlert, ExpiringProduct } from '../../model/alert.entity';
import {AlertItemComponent} from '../alert-item/alert-item.component';
import {MatDivider} from '@angular/material/divider';
import {MatCard, MatCardTitle} from '@angular/material/card';
import {NgForOf, NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-alert-list',
  templateUrl: './alert-list.component.html',
  imports: [
    AlertItemComponent,
    MatDivider,
    MatCardTitle,
    MatCard,
    NgForOf,
    NgIf,
    FormsModule
  ],
  styleUrls: ['./alert-list.component.css']
})
export class AlertListComponent {
  @Input() restocks: UrgentRestockAlert[] = [];
  @Input() expirations: ExpiringProduct[] = [];
  @Input() products: any[] = [];
  @Input() loading: boolean = false;
  @Input() successMsg: string = '';
  @Input() errorMsg: string = '';
  @Input() updateMinStock: (product: any) => void = () => {};

  // Para el modal de margen de vencimiento
  @Input() expirationAlertMargin: number = 7;
  @Output() expirationAlertMarginChange = new EventEmitter<number>();
  @Input() showEditMarginModal: boolean = false;
  @Input() openEditMarginModal: () => void = () => {};
  @Input() closeEditMarginModal: () => void = () => {};
  @Input() saveExpirationAlertMargin: () => void = () => {};
  @Input() marginSuccessMsg: string = '';
  @Input() marginErrorMsg: string = '';
  @Input() marginLoading: boolean = false;

  showAllRestocks = false;
  showAllExpirations = false;
  showEditPanel = false;

  get displayedRestocks(): UrgentRestockAlert[] {
    return this.showAllRestocks ? this.restocks : this.restocks.slice(0, 3);
  }

  get displayedExpirations(): ExpiringProduct[] {
    return this.showAllExpirations ? this.expirations : this.expirations.slice(0, 3);
  }

  toggleRestocks() {
    this.showAllRestocks = !this.showAllRestocks;
  }

  toggleExpirations() {
    this.showAllExpirations = !this.showAllExpirations;
  }

  toggleEditPanel() {
    this.showEditPanel = !this.showEditPanel;
  }

  toggleEditMarginModal() {
    if (this.openEditMarginModal) this.openEditMarginModal();
  }
}
