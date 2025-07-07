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
import {AuthenticationService} from '../../../authentication/services/authentication.service';
import {AccountService} from '../../../payment-and-subscriptions/services/account.service';

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

  /** Orders received by the current supplier */
  orders: PurchaseOrder[] = [];

  /** Supplier account (loaded from backend) */
  supplierAccountId = 0;

  constructor(
    private purchaseOrderService: PurchaseOrderService,
    private authService         : AuthenticationService,
    private accountService      : AccountService,
    private dialog              : MatDialog
  ) {}

  /* ---------------------------------------------------------------- */
  ngOnInit(): void {

    /* 1️⃣  Read accountId from session ----------------------------- */
    const { accountId } = this.authService.getCurrentUser();
    if (!accountId) {
      console.warn('[SalesOrder] No accountId in session – cannot load orders');
      return;
    }

    /* 2️⃣  Confirm the supplier account via backend ---------------- */
    this.accountService.getById(accountId).subscribe({
      next : acc => {
        this.supplierAccountId = acc.accountId;
        this.loadOrders();        // load only after account confirmation
      },
      error: err =>
        console.error('[SalesOrder] Error fetching supplier account:', err)
    });
  }

  /* ---------------------------------------------------------------- */
  /** Load orders and keep only those addressed to this supplier */
  private loadOrders(): void {

    if (!this.supplierAccountId) return;

    this.purchaseOrderService.getAll().subscribe(allOrders => {
      this.orders = allOrders.filter(o =>
        Number(o.supplier?.accountId ?? o.supplier?.id ?? 0) === this.supplierAccountId
      );
    });
  }

  /* ---------------------------------------------------------------- */
  formatPrice(amount: number, currencyCode = 'PEN'): string {
    return new Intl.NumberFormat('es-PE', {
      style: 'currency',
      currency: currencyCode,
      minimumFractionDigits: 2
    }).format(amount);
  }

  /* ---------------------------------------------------------------- */
  /** Open dialog to change order status */
  openStatusDialog(order: PurchaseOrder): void {
    const dlg = this.dialog.open(OrderStatusComponent, {
      width: '300px',
      data : { status: order.status }
    });

    dlg.afterClosed().subscribe(newStatus => {
      if (newStatus && newStatus !== order.status) {
        order.status = newStatus;
        this.purchaseOrderService.updateStatus(order.id, newStatus).subscribe();
      }
    });
  }
}
