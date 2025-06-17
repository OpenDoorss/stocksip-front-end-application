import { Component, OnInit } from '@angular/core';
import { PurchaseOrderService } from '../../services/purchase-order.service';
import {UserService} from '../../../authentication/services/user.service';
import {CatalogItem} from '../../model/catalog-item.entity';
import {Profile} from '../../../profile-management/models/profile.entity';
import {DateTime} from '../../../shared/model/date-time';
import {MatCard, MatCardContent, MatCardTitle} from '@angular/material/card';
import {CurrencyPipe, NgForOf} from '@angular/common';

@Component({
  selector: 'app-sales-order',
  templateUrl: './sales-order.component.html',
  imports: [
    MatCardContent,
    MatCardTitle,
    MatCard,
    NgForOf,
    CurrencyPipe
  ],
  styleUrls: ['./sales-order.component.css']
})
export class SalesOrderComponent implements OnInit {
  orders: {
    id: number;
    date: Date | DateTime;
    status: string;
    buyer: Profile;
    supplier: Profile;
    items: CatalogItem[];
    totalAmount: number;
    totalItems: number
  }[] = [];
  currentSupplierId: number = 0;

  constructor(
    private purchaseOrderService: PurchaseOrderService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.currentSupplierId = this.userService.currentUser?.profileId;
    this.loadOrders();
  }

  loadOrders(): void {
    this.purchaseOrderService.getAll().subscribe(orders => {
      this.orders = orders
        .filter(order => order.supplier?.profileId === this.currentSupplierId)
        .map(order => ({
          ...order,
          totalAmount: order.totalAmount?._amount ?? 0,
          date: order.date?._date ?? order.date
        }));
    });
  }

  formatPrice(amount: number, currencyCode: string = 'PES'): string {
    return new Intl.NumberFormat('es-PE', {
      style: 'currency',
      currency: currencyCode,
      minimumFractionDigits: 2
    }).format(amount);
  }


}
