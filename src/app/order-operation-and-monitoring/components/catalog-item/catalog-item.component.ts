import {Component, Input, OnInit} from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { CatalogService } from '../../services/catalog.service';
import { UserService } from '../../../authentication/services/user.service';
import { CatalogItem } from '../../model/catalog-item.entity';
import { Catalog } from '../../model/catalog.entity';
import { Money } from '../../../shared/model/money';
import { Currency } from '../../../shared/model/currency';
import { Router } from '@angular/router';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-catalog-item',
  templateUrl: './catalog-item.component.html',
  styleUrls: ['./catalog-item.component.css'],
  standalone: true,
  imports: [
    MatTableModule,
    MatCardModule,
    MatButtonModule,
    FormsModule,
    DatePipe
  ]
})
export class CatalogItemComponent implements OnInit {
  displayedColumns: string[] = ['name', 'content', 'type', 'brand', 'price'];
  catalogItems: CatalogItem[] = [];
  catalog: Catalog | null = null;

  // Formulario temporal para agregar productos
  newProduct = {
    name: '',
    productType: '',
    content: 0,
    brand: '',
    price: 0
  };

  constructor(
    private catalogService: CatalogService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const currentUser = this.userService.getCurrentUser();
    if (!currentUser) {
      console.error('User not found in localStorage');
      return;
    }

    const profileId = currentUser.profileId;

    this.catalogService.getCatalogByProfile(profileId).subscribe({
      next: (catalogs: Catalog[]) => {
        if (catalogs.length > 0) {
          this.catalog = catalogs[0];
          this.loadCatalogItems();
        } else {
          console.warn('No catalog found for this profile');
        }
      },
      error: err => console.error('Error loading catalog:', err)
    });
  }

  goToEdit(): void {
    this.router.navigate(['/catalog/edit/:catalogId']);
  }


  loadCatalogItems(): void {
    if (!this.catalog) return;

    this.catalogService.getCatalogItems(this.catalog.id).subscribe({
      next: (items: CatalogItem[]) => {
        this.catalogItems = items.map(item => {
          const rawPrice = item.unitPrice as any;

          // Validación adicional para evitar el error
          if (!rawPrice || (!rawPrice._amount && !rawPrice.amount)) {
            console.warn('Invalid price data in catalog item:', item);
            return {
              ...item,
              unitPrice: new Money(0, new Currency('PEN')) // valor por defecto
            };
          }

          const money = new Money(
            rawPrice._amount ?? rawPrice.amount,
            new Currency(rawPrice._currency?._code ?? rawPrice.currency)
          );

          return {
            ...item,
            unitPrice: money
          };
        });
      },
      error: err => console.error('Error loading catalog items:', err)
    });
  }



  formatPrice(price: { amount: number; currency: Currency } | null | undefined): string {
    if (!price) return 'N/A';
    const money = new Money(price.amount, price.currency);
    return money.format('es-PE');
  }
  addCatalogItem(): void {
    if (!this.catalog) return;

    const newItem: CatalogItem = {
      id: '',
      catalogId: this.catalog.id,
      dateAdded: new Date().toISOString(),
      name: this.newProduct.name,
      productType: this.newProduct.productType,
      content: this.newProduct.content,
      brand: this.newProduct.brand,
      unitPrice: new Money(this.newProduct.price, new Currency('PEN'))
    };

    this.catalogService.addCatalogItem(newItem).subscribe({
      next: (item: CatalogItem) => {
        this.catalogItems.push(item);
        this.newProduct = { name: '', productType: '', content: 0, brand: '', price: 0 };
      },
      error: err => console.error('Error adding catalog item:', err)
    });
  }
}
