import { Component, OnInit } from '@angular/core';
import { MatCard, MatCardTitle } from '@angular/material/card';
import {
  MatCell, MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow, MatRowDef,
  MatTable
} from '@angular/material/table';

import { CatalogService } from '../../services/catalog.service';
import { UserService } from '../../../authentication/services/user.service';
import { CatalogItem } from '../../model/catalog-item.entity';
import { Money } from '../../../shared/model/money';
import {Currency} from '../../../shared/model/currency';

@Component({
  selector: 'app-catalog-list',
  templateUrl: './catalog-list.component.html',
  styleUrls: ['./catalog-list.component.css'],
  standalone: true,
  imports: [
    MatCard,
    MatCardTitle,
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatRow,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRowDef,
    MatHeaderCellDef,
    MatCellDef
  ]
})
export class CatalogListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'content', 'type', 'brand', 'price'];
  catalogItems: CatalogItem[] = [];

  constructor(
    private catalogService: CatalogService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    const currentUser = this.userService.getCurrentUser();

    if (!currentUser) {
      console.error('User not found in localStorage');
      return;
    }

    const profileId = currentUser.profileId;
    console.log('Loading catalog for profileId:', profileId);

    this.catalogService.getCatalogByProfile(profileId).subscribe({
      next: (items: CatalogItem[]) => {
        console.log('Products received from the catalog:', items);

        this.catalogItems = items.map(item => {
          const rawPrice = item.product.unitPrice as any;

          const money = new Money(
            rawPrice._amount ?? rawPrice.amount,
            new Currency(rawPrice._currency?._code ?? rawPrice.currency)
          );

          return {
            ...item,
            product: {
              ...item.product,
              unitPrice: money
            }
          };
        });
      },
      error: (err) => {
        console.error('Error loading products from the catalog:', err);
      }
    });
  }

  formatPrice(price: { amount: number; currency: Currency } | null | undefined): string {
    if (!price) return 'N/A';

    const money = new Money(price.amount, price.currency);
    return money.format('es-PE');
  }
}
