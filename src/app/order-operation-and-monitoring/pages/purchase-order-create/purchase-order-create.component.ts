import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { Money } from '../../../shared/model/money';
import { Currency } from '../../../shared/model/currency';
import { DateTime } from '../../../shared/model/date-time';
import { CatalogService } from '../../services/catalog.service';
import { CatalogItem } from '../../model/catalog-item.entity';
import { PurchaseOrderService } from '../../services/purchase-order.service';
import { PurchaseOrder } from '../../model/purchase-order.entity';
import { UserService } from '../../../authentication/services/user.service';
import { Profile } from '../../../profile-management/models/profile.entity';
import {ProfileService} from '../../../profile-management/services/profile.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-purchase-order-create',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatCheckboxModule,
    MatTableModule,
    FormsModule
  ],
  templateUrl: './purchase-order-create.component.html',
  styleUrls: ['./purchase-order-create.component.css']
})
export class PurchaseOrderCreateComponent implements OnInit {
  catalogId!: number;
  catalogItems: CatalogItem[] = [];
  selectedItems: { [id: string]: boolean } = {};
  buyerProfile!: Profile;
  supplierProfile!: Profile;

  constructor(
    private route: ActivatedRoute,
    private catalogService: CatalogService,
    private orderService: PurchaseOrderService,
    private userService: UserService,
    private router: Router,
    private profileService: ProfileService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.catalogId = +this.route.snapshot.paramMap.get('catalogId')!;
    this.buyerProfile = this.userService.getCurrentUserProfile()!;

    this.catalogService.getCatalogItems(this.catalogId).subscribe({
      next: (items) => this.catalogItems = items,
      error: (err) => console.error('Error cargando ítems del catálogo', err)
    });

    this.catalogService.getCatalogById(this.catalogId).subscribe({
      next: (catalog) => {
        const supplierProfileId = catalog.profileId;

        this.profileService.getProfileById(supplierProfileId).subscribe({
          next: (profile: any) => this.supplierProfile = profile as Profile,
          error: (err: any) => console.error('Error cargando perfil del proveedor', err)
        });

      },
      error: (err) => console.error('Error cargando catálogo', err)
    });
  }

  get selectedCatalogItems(): CatalogItem[] {
    return this.catalogItems.filter(item => this.selectedItems[item.id]);
  }

  get totalItems(): number {
    return this.selectedCatalogItems.length;
  }

  get totalPrice(): Money {
    const sum = this.selectedCatalogItems.reduce((acc, item) => acc + item.unitPrice.amount, 0);
    return new Money(sum, new Currency('PEN'));
  }

  createOrder(): void {
    const selectedItems = this.selectedCatalogItems;

    if (selectedItems.length === 0) {
      this.snackBar.open('Selecciona al menos un producto', 'Cerrar', { duration: 3000 });
      return;
    }

    const newOrder: PurchaseOrder = {
      id: 0,
      date: new DateTime(),
      status: 'sent',
      buyer: this.buyerProfile,
      supplier: this.supplierProfile,
      items: selectedItems,
      totalAmount: this.totalPrice,
      totalItems: selectedItems.length
    };

    this.orderService.createPurchaseOrder(newOrder).subscribe({
      next: () => this.router.navigate(['/orders']),
      error: (err) => console.error('Error al crear orden:', err)
    });
  }

  formatPrice(price: Money): string {
    return price?.format('es-PE') ?? 'S/ 0.00';
  }

}
