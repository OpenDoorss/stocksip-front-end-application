/* catalog-for-orders.component.ts */

import { Component, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  MatCard, MatCardActions, MatCardSubtitle, MatCardTitle
} from '@angular/material/card';
import { MatButton }          from '@angular/material/button';
import { MatList, MatListItem } from '@angular/material/list';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { FormsModule }        from '@angular/forms';
import { MatSnackBar }        from '@angular/material/snack-bar';
import { DatePipe, NgForOf, NgIf } from '@angular/common';

import { CatalogService }       from '../../services/catalog.service';
import { AccountService }       from '../../../payment-and-subscriptions/services/account.service';
import { AuthenticationService } from '../../../authentication/services/authentication.service';

import { Catalog }      from '../../model/catalog.entity';
import { CatalogItem }  from '../../model/catalog-item.entity';
import { Account }      from '../../../payment-and-subscriptions/model/account.entity';

import { ToolBarComponent }  from '../../../public/components/tool-bar/tool-bar.component';
import { SideNavbarComponent } from '../../../public/components/side-navbar/side-navbar.component';

@Component({
  selector   : 'app-catalog-for-orders',
  templateUrl: './catalog-for-orders.component.html',
  styleUrls  : ['./catalog-for-orders.component.css'],
  standalone : true,
  imports: [
    MatCardSubtitle, MatCardTitle, NgForOf, NgIf, MatCard, MatButton,
    DatePipe, MatListItem, MatList, MatLabel, MatFormField,
    FormsModule, MatInput, MatCardActions, RouterLink,
    ToolBarComponent, SideNavbarComponent
  ]
})
export class CatalogForOrdersComponent implements OnInit {

  @Input() catalogCards!: Catalog[];

  providerEmail = '';
  catalogs: Catalog[] = [];

  selectedItems:    { [catalogId: number]: CatalogItem[] } = {};
  selectedForOrder: { [itemId: number]: boolean } = {};
  quantities:       { [itemId: number]: number } = {};

  isAllowed = false;

  constructor(
    private catalogService : CatalogService,
    private accountService : AccountService,
    private authService    : AuthenticationService,
    private snackBar       : MatSnackBar
  ) {}

  /* ------------------------------------------------------------------ */
  ngOnInit(): void {

    const { accountId } = this.authService.getCurrentUser();
    console.log('[CatalogForOrders] accountId from localStorage:', accountId);

    if (!accountId) {
      this.snackBar.open('Session not found.', 'Close', { duration: 3000 });
      return;
    }

    this.accountService.getById(accountId).subscribe({
      next : (acc: Account) => {
        console.log('[CatalogForOrders] account fetched from backend:', acc);
        this.isAllowed = acc.role === 'Liquor Store Owner';

        if (!this.isAllowed) {
          this.snackBar.open(
            'This section is available only to liquor‑store owners.',
            'Close',
            { duration: 3000 }
          );
        }
      },
      error: err => {
        console.error('[CatalogForOrders] error fetching current account:', err);
        this.snackBar.open('Unable to verify user role.', 'Close', { duration: 3000 });
      }
    });
  }

  /* ------------------------------------------------------------------ */
  loadItems(catalogId: number): void {
    if (!this.selectedItems[catalogId]) {
      console.log('[CatalogForOrders] loading items for catalog', catalogId);
      this.catalogService.getCatalogItems(catalogId).subscribe({
        next : items => {
          console.log('[CatalogForOrders] items loaded:', items);
          this.selectedItems[catalogId] = items;
        },
        error: err =>
          console.error('[CatalogForOrders] error fetching items:', err)
      });
    }
  }

  /* ------------------------------------------------------------------ */
  loadProviderCatalogs(): void {
    if (!this.isAllowed) {
      console.warn('[CatalogForOrders] not allowed – current user is not LSO');
      return;
    }
    if (!this.providerEmail.trim()) {
      console.warn('[CatalogForOrders] providerEmail is empty');
      return;
    }

    console.log('[CatalogForOrders] requesting catalogs for supplier email:', this.providerEmail);

    this.catalogService
      .getPublishedCatalogsByProviderEmail(this.providerEmail.trim())
      .subscribe({
        next: catalogs => {
          console.log('[CatalogForOrders] catalogs response:', catalogs);
          this.catalogs = catalogs;
          if (!catalogs.length) {
            this.snackBar.open(
              'Supplier has no published catalogs.',
              'Close',
              { duration: 3000 }
            );
          }
        },
        error: err => {
          console.error('[CatalogForOrders] 400/other error response:', err);
          this.snackBar.open(
            err.status === 400
              ? 'E‑mail not found or the account is not a Supplier.'
              : 'Error while loading catalogs.',
            'Close',
            { duration: 3000 }
          );
        }
      });
  }

  /* ------------------------------------------------------------------ */
  toggleItemSelection(itemId: number): void {
    this.selectedForOrder[itemId] = !this.selectedForOrder[itemId];
  }
}
