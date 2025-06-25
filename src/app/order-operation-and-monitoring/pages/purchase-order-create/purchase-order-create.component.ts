import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { DateTime } from '../../../shared/model/date-time';
import { CatalogService } from '../../services/catalog.service';
import { CatalogItem } from '../../model/catalog-item.entity';
import { PurchaseOrderService } from '../../services/purchase-order.service';
import { PurchaseOrder } from '../../model/purchase-order.entity';
import { UserService } from '../../../authentication/services/user.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {SideNavbarComponent} from '../../../public/components/side-navbar/side-navbar.component';
import {ToolBarComponent} from '../../../public/components/tool-bar/tool-bar.component';
import {Account} from '../../../payment-and-subscriptions/model/account.entity';
import {MatInput} from '@angular/material/input';

@Component({
  selector: 'app-purchase-order-create',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatCheckboxModule,
    MatTableModule,
    FormsModule,
    SideNavbarComponent,
    ToolBarComponent,
    MatInput
  ],
  templateUrl: './purchase-order-create.component.html',
  styleUrls: ['./purchase-order-create.component.css']
})
export class PurchaseOrderCreateComponent implements OnInit {
  catalogId!: number;
  catalogItems: CatalogItem[] = [];

  selectedItems: Record<string, boolean> = {};
  quantities: Record<string, string> = {};

  buyerAccount!: Account;
  supplierAccount!: Account;

  constructor(
    private route: ActivatedRoute,
    private catalogService: CatalogService,
    private orderService: PurchaseOrderService,
    private userService: UserService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.catalogId = +this.route.snapshot.paramMap.get('catalogId')!;
    this.buyerAccount = this.userService.getCurrentUser()?.account as Account;

    this.catalogService.getCatalogItems(this.catalogId).subscribe({
      next: items => (this.catalogItems = items),
      error: err => console.error('Error cargando ítems:', err)
    });

    this.catalogService.getCatalogById(this.catalogId).subscribe({
      next: catalog => {
        this.userService.getAccountById(catalog.accountId).subscribe({
          next: acc => (this.supplierAccount = acc as Account),
          error: err => console.error('Error cargando proveedor:', err)
        });
      },
      error: err => console.error('Error cargando catálogo:', err)
    });
  }

  get selectedCatalogItems(): CatalogItem[] {
    return this.catalogItems.filter(i => this.selectedItems[i.id]);
  }

  get totalItems(): number {
    return this.selectedCatalogItems.length;
  }

  get totalPrice(): number {
    return this.selectedCatalogItems.reduce(
      (sum, i) => sum + i.unitPrice,
      0
    );
  }

  createOrder(): void {
    if (this.selectedCatalogItems.length === 0) {
      this.snackBar.open('Select at least one product', 'Close', { duration: 3000 });
      return;
    }

    const itemsWithQty = this.selectedCatalogItems.map(i => ({
      ...i,
      customQuantity: this.quantities[i.id] || ''
    }));

    const newOrder: PurchaseOrder = {
      id: 0,
      date: new DateTime(),
      status: 'Received',
      buyer: this.buyerAccount,
      supplier: this.supplierAccount,
      items: itemsWithQty,
      totalAmount: this.totalPrice,
      totalItems: itemsWithQty.length
    };

    this.orderService.createPurchaseOrder(newOrder).subscribe({
      next: () => this.router.navigate(['/orders']),
      error: err => console.error('Error al crear orden:', err)
    });
  }

  formatPrice(amount: number, code: string = 'PEN'): string {
    return new Intl.NumberFormat('es-PE', {
      style: 'currency',
      currency: code,
      minimumFractionDigits: 2
    }).format(amount);
  }
}
