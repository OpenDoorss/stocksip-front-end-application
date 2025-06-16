import { Component, OnInit } from '@angular/core';
import { CatalogService } from '../../services/catalog.service';
import { CatalogItem } from '../../model/catalog-item.entity';
import { Money } from '../../../shared/model/money';
import { Currency } from '../../../shared/model/currency';
import { ActivatedRoute } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { Catalog } from '../../model/catalog.entity';
import { v4 as uuidv4 } from 'uuid';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-catalog-create-and-edit',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatButtonModule,
    MatTableModule
  ],
  templateUrl: './catalog-create-and-edit.component.html',
  styleUrl: './catalog-create-and-edit.component.css'
})
export class CatalogCreateAndEditComponent implements OnInit {
  catalog: Catalog = { id: 0, name: '', profileId: 0, dateCreated: '' , isPublished: false};
  catalogItems: CatalogItem[] = [];
  isEditMode = false;
  showError = false;

  newProduct = {
    name: '',
    productType: '',
    content: 0,
    brand: '',
    price: null as number | null,
  };

  constructor(
    private route: ActivatedRoute,
    private catalogService: CatalogService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const catalogId = +params.get('catalogId')!;
      this.isEditMode = !!catalogId;

      if (this.isEditMode) {
        this.catalogService.getCatalogById(catalogId).subscribe({
          next: (catalog) => {
            this.catalog = catalog;
            this.loadCatalogItems();
          },
          error: err => console.error('Error loading catalog:', err)
        });
      }
    });
  }


  loadCatalogItems(): void {
    if (!this.catalog.id) return;

    this.catalogService.getCatalogItems(this.catalog.id).subscribe({
      next: (items) => {
        this.catalogItems = items.map(item => {
          const rawPrice = item.unitPrice as any;
          const money = new Money(
            rawPrice?._amount ?? rawPrice?.amount ?? 0,
            new Currency(rawPrice?._currency?._code ?? rawPrice?.currency ?? 'PEN')
          );
          return { ...item, unitPrice: money };
        });
      },
      error: err => console.error('Error loading items:', err)
    });
  }

  onSave(): void {
    if (!this.catalog.name.trim()) {
      this.showError = true;
      return;
    }

    this.showError = false;

    const updatedCatalog = {
      ...this.catalog,
      name: this.catalog.name.trim()
    };

    this.catalogService.updateCatalog(updatedCatalog).subscribe({
      next: () => {
        const isProductFormFilled = Object.values(this.newProduct).some(f => f !== '' && f !== null && f !== 0);

        if (isProductFormFilled) {
          const isProductFormValid = Object.values(this.newProduct).every(f => f !== '' && f !== null && f !== 0);
          if (!isProductFormValid) {
            this.showError = true;
            return;
          }

          const newCatalogItem: CatalogItem = {
            id: uuidv4(),
            catalogId: this.catalog.id,
            dateAdded: new Date().toISOString(),
            name: this.newProduct.name,
            productType: this.newProduct.productType,
            brand: this.newProduct.brand,
            content: +this.newProduct.content,
            unitPrice: new Money(this.newProduct.price!, new Currency('PEN'))
          };

          this.catalogService.addCatalogItem(newCatalogItem).subscribe({
            next: () => {
              this.catalogItems.push(newCatalogItem);
              this.resetForm();
              alert('Catálogo actualizado y producto agregado correctamente');
            },
            error: err => console.error('Error agregando producto:', err)
          });
        } else {
          alert('Catálogo actualizado correctamente');
        }
      },
      error: err => console.error('Error actualizando catálogo:', err)
    });
  }

  resetForm(): void {
    this.newProduct = {
      name: '',
      productType: '',
      content: 0,
      brand: '',
      price: null
    };
  }

  formatPrice(price: Money): string {
    return price?.format('es-PE') ?? 'S/0.00';
  }
}
