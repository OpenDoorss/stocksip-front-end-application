import { Component, Input, OnInit } from '@angular/core';
import { CatalogService } from '../../services/catalog.service';
import { Catalog } from '../../model/catalog.entity';
import { CatalogItem } from '../../model/catalog-item.entity';
import { UserService } from '../../../authentication/services/user.service';
import {MatCard, MatCardActions, MatCardSubtitle, MatCardTitle} from '@angular/material/card';
import { CurrencyPipe, DatePipe, NgForOf, NgIf } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { MatList, MatListItem } from '@angular/material/list';
import { FormsModule } from '@angular/forms';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import {Router, RouterLink} from '@angular/router';

@Component({
  selector: 'app-catalog-for-orders',
  templateUrl: './catalog-for-orders.component.html',
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
    CurrencyPipe,
    MatLabel,
    MatFormField,
    FormsModule,
    MatInput,
    MatCardActions,
    RouterLink
  ],
  styleUrls: ['./catalog-for-orders.component.css'],
  standalone: true
})
export class CatalogForOrdersComponent implements OnInit {
  selectedItems: { [key: number]: CatalogItem[] } = {};
  isAllowed = false;

  selectedForOrder: { [itemId: number]: boolean } = {};
  quantities: { [itemId: number]: number } = {};

  providerEmail: string = '';
  catalogs: Catalog[] = [];
  @Input() catalogCards!: Catalog[];

  constructor(
    private catalogService: CatalogService,
    private userService: UserService,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    const profile = this.userService.getCurrentUserProfile();

    if (profile?.role === 'Liquor Store Owner') {
      this.isAllowed = true;
      this.catalogs = [];
    }
  }

  loadItems(catalogId: number): void {
    if (!this.selectedItems[catalogId]) {
      this.catalogService.getCatalogItems(catalogId).subscribe({
        next: (items) => this.selectedItems[catalogId] = items,
        error: (err) => console.error('Error fetching items for catalog:', err)
      });
    }
  }

  loadProviderCatalogs(): void {
    if (!this.providerEmail) return;

    this.userService.getProfileByEmail(this.providerEmail).subscribe({
      next: (profile) => {
        if (!profile || profile.role !== 'Supplier') {
          this.snackBar.open('No se encontró proveedor válido con ese correo', 'Cerrar', { duration: 3000 });
          return;
        }

        this.catalogService.getPublishedCatalogsByProfile(profile.profileId).subscribe({
          next: (catalogs) => {
            this.catalogs = catalogs;
          },
          error: () => {
            this.snackBar.open('Error al cargar catálogos del proveedor', 'Cerrar', { duration: 3000 });
          }
        });
      },
      error: () => {
        this.snackBar.open('Proveedor no encontrado', 'Cerrar', { duration: 3000 });
      }
    });
  }

  toggleItemSelection(itemId: number): void {
    this.selectedForOrder[itemId] = !this.selectedForOrder[itemId];
  }


}
