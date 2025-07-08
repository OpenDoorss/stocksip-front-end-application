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
import {AuthenticationService} from '../../../authentication/services/authentication.service';
import {AccountService} from '../../../payment-and-subscriptions/services/account.service';

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

  /** Mapas para selección y cantidades */
  selectedItems: Record<string, boolean> = {};
  quantities   : Record<string, number>  = {};

  /** Cuentas cargadas desde el backend */
  buyerAccount   : Account | null = null;
  supplierAccount: Account | null = null;

  constructor(
    private route         : ActivatedRoute,
    private catalogService: CatalogService,
    private orderService  : PurchaseOrderService,
    private authService   : AuthenticationService,
    private accountService: AccountService,
    private router        : Router,
    private snackBar      : MatSnackBar
  ) {}

  /* -------------------------------------------------------------- */
  ngOnInit(): void {

    this.catalogId = +this.route.snapshot.paramMap.get('catalogId')!;

    /* 1️⃣  Cargar ítems del catálogo */
    this.catalogService.getCatalogItems(this.catalogId).subscribe({
      next : items => this.catalogItems = items,
      error: err   => console.error('Error cargando ítems:', err)
    });

    /* 2️⃣  Obtener la cuenta del comprador desde sesión */
    const { accountId } = this.authService.getCurrentUser();
    if (!accountId) {
      this.snackBar.open('Sesión no válida. Vuelve a iniciar sesión.', 'Cerrar', { duration: 3000 });
      return;
    }

    this.accountService.getById(accountId).subscribe({
      next : acc => this.buyerAccount = acc,
      error: err => console.error('Error cargando cuenta compradora:', err)
    });

    /* 3️⃣  Obtener la cuenta del proveedor (dueño del catálogo) */
    this.catalogService.getCatalogById(this.catalogId).subscribe({
      next: catalog =>
        this.accountService.getById(catalog.accountId).subscribe({
          next : acc => this.supplierAccount = acc,
          error: err => console.error('Error cargando proveedor:', err)
        }),
      error: err => console.error('Error cargando catálogo:', err)
    });
  }

  /* -------------------------------------------------------------- */
  /** Ítems seleccionados */
  get selectedCatalogItems(): CatalogItem[] {
    return this.catalogItems.filter(i => this.selectedItems[i.id]);
  }

  /** Precio total */
  get totalPrice(): number {
    return this.selectedCatalogItems.reduce((sum, item) => {
      const qty = this.quantities[item.id] ?? 0;
      return sum + item.unitPrice * qty;
    }, 0);
  }

  private unwrap(v: any) {
    return (typeof v === 'object' && v !== null) ? (v.value ?? v) : v;
  }

  /** Normaliza el businessName: evita timestamps o strings vacíos */
  private normalizeBusinessName(name: any): string {
    const value = this.unwrap(name);
    return (typeof value === 'string' && value.match(/^\d{4}-\d\d-\d\dT/))
      ? 'N/A'
      : (value || 'N/A');
  }

  /* -------------------------------------------------------------- */
  createOrder(): void {

    /* Validaciones básicas ------------------------------------------ */
    if (!this.buyerAccount || !this.supplierAccount) {
      console.error('[PurchaseOrder] buyerAccount o supplierAccount null');
      return;
    }
    if (this.selectedCatalogItems.length === 0) {
      this.snackBar.open('Selecciona al menos un producto', 'Cerrar', { duration: 3000 });
      return;
    }
    if (this.selectedCatalogItems.some(i => !this.quantities[i.id] || this.quantities[i.id] <= 0)) {
      this.snackBar.open('Ingresa cantidades válidas', 'Cerrar', { duration: 3000 });
      return;
    }

    /* Helper para extraer value o valor directo --------------------- */
    const buyer = {
      accountId   : this.unwrap(this.buyerAccount.accountId),
      userOwnerId : this.unwrap(this.buyerAccount.userOwnerId)           // ← ahora no será undefined
        ?? 0,                                               // fallback
      role        : this.unwrap(this.buyerAccount.role),
      businessName: this.normalizeBusinessName(this.buyerAccount.businessName),
      email       : this.unwrap(this.buyerAccount.email)
        ?? this.authService.getCurrentUser().username       // fallback al username
    };

    const supplier = {
      accountId   : this.unwrap(this.supplierAccount.accountId),
      userOwnerId : this.unwrap(this.supplierAccount.userOwnerId) ?? 0,
      role        : this.unwrap(this.supplierAccount.role),
      businessName: this.normalizeBusinessName(this.supplierAccount.businessName),
      email       : this.unwrap(this.supplierAccount.email) ?? ''
    };


    /* Log → identifica campos nulos antes de fallar ----------------- */
    console.table({ buyer, supplier });

    /* Si algún campo obligatorio está vacío, avisa y detén ---------- */
    if (Object.values(buyer).some(v => v === null || v === undefined || v === '')) {
      this.snackBar.open('Datos del comprador incompletos', 'Cerrar', { duration: 3000 });
      return;
    }

    /* Mapear ítems seleccionados ------------------------------------ */
    const items = this.selectedCatalogItems.map(i => ({
      id            : i.id,
      catalogId     : i.catalogId ?? this.catalogId,
      name          : i.name,
      productType   : i.productType,
      brand         : i.brand,
      content       : i.content,
      unitPrice     : i.unitPrice,
      dateAdded     : i.dateAdded ?? new Date().toISOString(),
      customQuantity: this.quantities[i.id]
    }));

    /* Payload final -------------------------------------------------- */
    const orderPayload = {
      buyer,
      supplier,
      items,
      totalAmount: this.totalPrice,
      totalItems : items.length
    };

    console.log('➡️  [PurchaseOrder] Payload enviado:', orderPayload);

    /* Enviar al backend --------------------------------------------- */
    this.orderService.createPurchaseOrder(orderPayload).subscribe({
      next : ()  => this.router.navigate(['/orders']),
      error: err => {
        console.error('⛔️ Error al crear la orden:', err);
        this.snackBar.open('Error al crear la orden', 'Cerrar', { duration: 4000 });
      }
    });
  }

  /* -------------------------------------------------------------- */
  formatPrice(amount: number, code = 'PEN'): string {
    return new Intl.NumberFormat('es-PE', {
      style: 'currency',
      currency: code,
      minimumFractionDigits: 2
    }).format(amount).replace('S/', 'S/.');
  }
}
