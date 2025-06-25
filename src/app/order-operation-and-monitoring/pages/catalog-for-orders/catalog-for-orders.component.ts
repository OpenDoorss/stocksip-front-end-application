import { Component, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  MatCard,
  MatCardActions,
  MatCardSubtitle,
  MatCardTitle
} from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { MatList, MatListItem } from '@angular/material/list';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { CatalogService } from '../../services/catalog.service';
import { UserService } from '../../../authentication/services/user.service';

import { Catalog } from '../../model/catalog.entity';
import { CatalogItem } from '../../model/catalog-item.entity';

import { ToolBarComponent } from '../../../public/components/tool-bar/tool-bar.component';
import { SideNavbarComponent } from '../../../public/components/side-navbar/side-navbar.component';
import {DatePipe, NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-catalog-for-orders',
  templateUrl: './catalog-for-orders.component.html',
  styleUrls: ['./catalog-for-orders.component.css'],
  standalone: true,
  imports: [
    MatCardSubtitle,
    MatCardTitle,
    NgForOf,
    NgIf,
    MatCard,
    MatButton,
    DatePipe,
    MatListItem,
    MatList,
    MatLabel,
    MatFormField,
    FormsModule,
    MatInput,
    MatCardActions,
    RouterLink,
    ToolBarComponent,
    SideNavbarComponent
  ]
})
export class CatalogForOrdersComponent implements OnInit {
  @Input() catalogCards!: Catalog[];

  providerEmail = '';
  catalogs: Catalog[] = [];

  selectedItems: { [key: number]: CatalogItem[] } = {};
  selectedForOrder: { [itemId: number]: boolean } = {};
  quantities: { [itemId: number]: number } = {};

  isAllowed = false;

  constructor(
    private catalogService: CatalogService,
    private userService: UserService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    const user = this.userService.getCurrentUser();
    const role = user?.role;

    this.isAllowed = role === 'Liquor Store Owner';

    if (!this.isAllowed) {
      this.snackBar.open(
        'Esta sección es solo para licorerías',
        'Cerrar',
        { duration: 3000 }
      );
    }
  }

  loadItems(catalogId: number): void {
    if (!this.selectedItems[catalogId]) {
      this.catalogService.getCatalogItems(catalogId).subscribe({
        next: items => (this.selectedItems[catalogId] = items),
        error: err =>
          console.error('Error fetching items for catalog:', err)
      });
    }
  }

  loadProviderCatalogs(): void {
    if (!this.isAllowed) return;
    if (!this.providerEmail) return;

    this.userService.getAccountByEmail(this.providerEmail).subscribe({
      next: account => {
        if (!account || account.role !== 'Supplier') {
          this.snackBar.open(
            'No se encontró proveedor válido con ese correo',
            'Cerrar',
            { duration: 3000 }
          );
          return;
        }

        const accountId = (account as any).accountId ?? account.id;

        this.catalogService
          .getPublishedCatalogsByAccount(accountId)
          .subscribe({
            next: catalogs => (this.catalogs = catalogs),
            error: () =>
              this.snackBar.open(
                'Error al cargar catálogos del proveedor',
                'Cerrar',
                { duration: 3000 }
              )
          });
      },
      error: () =>
        this.snackBar.open(
          'Proveedor no encontrado',
          'Cerrar',
          { duration: 3000 }
        )
    });
  }

  toggleItemSelection(itemId: number): void {
    this.selectedForOrder[itemId] = !this.selectedForOrder[itemId];
  }
}
