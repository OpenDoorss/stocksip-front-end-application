import {Component, Input} from '@angular/core';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable
} from '@angular/material/table';
import {MatCard, MatCardTitle} from '@angular/material/card';
import {DatePipe, NgClass} from '@angular/common';
import {PurchaseOrder} from '../../model/purchase-order.entity';

@Component({
  selector: 'app-purchase-order-list',
  imports: [
    MatHeaderCell,
    MatColumnDef,
    MatTable,
    MatCardTitle,
    MatCard,
    MatHeaderCellDef,
    MatCellDef,
    MatCell,
    MatHeaderRow,
    MatRow,
    MatHeaderRowDef,
    MatRowDef,
    DatePipe,
    NgClass
  ],
  templateUrl: './purchase-order-list.component.html',
  styleUrl: './purchase-order-list.component.css'
})
export class PurchaseOrderListComponent {
  @Input() orders: PurchaseOrder[] = [];

  formatPrice(amount: number, currencyCode: string = 'PEN'): string {
    const formatted = new Intl.NumberFormat('es-PE', {
      style: 'currency',
      currency: currencyCode,
      minimumFractionDigits: 2
    }).format(amount);
    return formatted.replace('S/', 'S/.');
  }

}

