import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {DatePipe, NgForOf} from '@angular/common';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardTitle
} from '@angular/material/card';

import { PurchaseOrderService } from '../../services/purchase-order.service';
import { UserService } from '../../../authentication/services/user.service';

import { CatalogItem } from '../../model/catalog-item.entity';
import { DateTime } from '../../../shared/model/date-time';
import { Account } from '../../../payment-and-subscriptions/model/account.entity';

import { SideNavbarComponent } from '../../../public/components/side-navbar/side-navbar.component';
import { ToolBarComponent } from '../../../public/components/tool-bar/tool-bar.component';
import { OrderStatusComponent } from '../../components/order-status/order-status.component';
import {MatButton} from '@angular/material/button';
import {PurchaseOrder} from '../../model/purchase-order.entity';

@Component({
  selector: 'app-sales-order',
  templateUrl: './sales-order.component.html',
  styleUrls: ['./sales-order.component.css'],
  standalone: true,
  imports: [
    MatCardContent,
    MatCardTitle,
    MatCard,
    NgForOf,
    SideNavbarComponent,
    ToolBarComponent,
    MatCardActions,
    MatButton,
    DatePipe
  ]
})

export class SalesOrderComponent implements OnInit {
  orders: PurchaseOrder[] = [];

  private currentAccountId = 0;

  constructor(
    private purchaseOrderService: PurchaseOrderService,
    private userService: UserService,
    private dialog: MatDialog
  ) {}


  ngOnInit(): void {
    const user = this.userService.getCurrentUser();

    this.currentAccountId =
      user?.account?.accountId ?? user?.account?.id ?? 0;

    if (!this.currentAccountId) {
      console.warn('Sin cuenta asociada; no se mostrarán órdenes');
      return;
    }

    this.loadOrders();
  }

  private loadOrders(): void {
    this.purchaseOrderService.getAll().subscribe(allOrders => {

      this.orders = allOrders.filter(o => {
        const supplierId = Number(o.supplier?.accountId ?? o.supplier?.id ?? 0);
        return supplierId === Number(this.currentAccountId);
      });
    });
  }





  formatPrice(amount: number, currencyCode = 'PEN'): string {
    return new Intl.NumberFormat('es-PE', {
      style: 'currency',
      currency: currencyCode,
      minimumFractionDigits: 2
    }).format(amount);
  }

  openStatusDialog(order: any): void {
    const dlg = this.dialog.open(OrderStatusComponent, {
      width: '300px',
      data: { status: order.status }
    });

    dlg.afterClosed().subscribe(newStatus => {
      if (newStatus && newStatus !== order.status) {
        order.status = newStatus;
        this.purchaseOrderService
          .updateStatus(order.id, newStatus)
          .subscribe();
      }
    });
  }
}
