import { Component, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';

import { AuthenticationService } from '../../../authentication/services/authentication.service';
import { AccountService }        from '../../../payment-and-subscriptions/services/account.service';

import { PurchaseOrderComponent } from '../purchase-order/purchase-order.component';
import { SalesOrderComponent }    from '../sales-order/sales-order.component';

import { Account } from '../../../payment-and-subscriptions/model/account.entity';

@Component({
  selector   : 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls  : ['./orders.component.css'],
  standalone : true,
  imports    : [
    NgIf,
    PurchaseOrderComponent,
    SalesOrderComponent
  ]
})
export class OrdersComponent implements OnInit {

  /** Cuenta recuperada del backend */
  account: Account | null = null;

  constructor(
    private authService   : AuthenticationService,
    private accountService: AccountService
  ) {}

  /* -------------------------------------------------------------- */
  ngOnInit(): void {
    /** 1️⃣  Leer el accountId almacenado tras el login */
    const { accountId } = this.authService.getCurrentUser();

    if (!accountId) {
      console.error('No se encontró accountId en sesión');
      return;
    }

    /** 2️⃣  Pedir la cuenta al backend para conocer el rol real */
    this.accountService.getById(accountId).subscribe({
      next : acc => this.account = acc,
      error: err => console.error('Error al obtener la cuenta:', err)
    });
  }

  /* -------------------------------------------------------------- */
  /** Helper para plantillas */
  isSupplier(): boolean {
    return this.account?.role === 'Supplier';
  }

  isLiquorStoreOwner(): boolean {
    return this.account?.role === 'Liquor Store Owner';
  }
}
