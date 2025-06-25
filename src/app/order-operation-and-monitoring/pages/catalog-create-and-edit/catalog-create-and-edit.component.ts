import { Component, OnInit } from '@angular/core';
import { CatalogService } from '../../services/catalog.service';
import { CatalogItem } from '../../model/catalog-item.entity';
import { Money } from '../../../shared/model/money';
import { ActivatedRoute } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../../authentication/services/user.service';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { Catalog } from '../../model/catalog.entity';
import { v4 as uuidv4 } from 'uuid';
import { MatTableModule } from '@angular/material/table';
import {SideNavbarComponent} from '../../../public/components/side-navbar/side-navbar.component';
import {ToolBarComponent} from '../../../public/components/tool-bar/tool-bar.component';

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
    MatTableModule,
    SideNavbarComponent,
    ToolBarComponent
  ],
  templateUrl: './catalog-create-and-edit.component.html',
  styleUrl: './catalog-create-and-edit.component.css'
})
export class CatalogCreateAndEditComponent implements OnInit {
  catalog: Catalog = {
    id: 0,
    name: '',
    accountId: '',
    dateCreated: '',
    isPublished: false
  };

  catalogItems: {
    id: string;
    catalogId: number;
    dateAdded: string;
    name: string;
    productType: string;
    content: number;
    brand: string;
    unitPrice: Money
  }[] = [];
  isEditMode = false;
  showError = false;
  pageTitle = '';

  newProduct = {
    name: '',
    productType: '',
    content: 0,
    brand: '',
    price: null as number | null
  };

  constructor(
    private route: ActivatedRoute,
    private catalogService: CatalogService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const catalogId = +params.get('catalogId')!;
      this.isEditMode = !!catalogId;
      this.pageTitle = this.isEditMode ? 'catalog.edit' : 'catalog.create';

      if (this.isEditMode) {
        this.catalogService.getCatalogById(catalogId).subscribe({
          next: catalog => {
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
      next: items => {
        /* asumimos que backend ya devuelve unitPrice como number */
        this.catalogItems = items as any;
      },
      error: err => console.error('Error loading items:', err)
    });
  }


  onSave(): void {
    if (!this.catalog.name.trim()) { this.showError = true; return; }
    this.showError = false;

    const currentUser = this.userService.getCurrentUser();
    if (!currentUser?.account?.id) {
      console.error('No se encontró la cuenta del usuario');
      this.showError = true;
      return;
    }

    const catalogPayload: Catalog = {
      ...this.catalog,
      name: this.catalog.name.trim(),
      accountId: currentUser.account.id,
      dateCreated: new Date().toISOString(),
      isPublished: false
    };

    (this.isEditMode
        ? this.catalogService.updateCatalog(catalogPayload)
        : this.catalogService.createCatalog(catalogPayload)
    ).subscribe({
      next: createdOrUpdated => {
        if (!this.isEditMode) this.catalog = createdOrUpdated;
        this.isEditMode = true;
        this.handleCatalogSaveSuccess();
      },
      error: err =>
        console.error(
          this.isEditMode ? 'Error actualizando catálogo:' : 'Error creando catálogo:',
          err
        )
    });
  }
  private handleCatalogSaveSuccess(): void {
    const filled = Object.values(this.newProduct).some(v => v !== '' && v !== null && v !== 0);
    if (filled) {
      const valid = Object.values(this.newProduct).every(v => v !== '' && v !== null && v !== 0);
      if (!valid) { this.showError = true; return; }

      const newCatalogItem: CatalogItem = {
        id: uuidv4(),
        catalogId: this.catalog.id,
        dateAdded: new Date().toISOString(),
        name: this.newProduct.name,
        productType: this.newProduct.productType,
        brand: this.newProduct.brand,
        content: +this.newProduct.content,
        unitPrice: this.newProduct.price!
      };

      this.catalogService.addCatalogItem(newCatalogItem).subscribe({
        next: () => {
          this.catalogItems.push(newCatalogItem as any);
          this.resetForm();
          alert(this.isEditMode
            ? 'Catálogo actualizado y producto agregado correctamente'
            : 'Catálogo creado y producto agregado correctamente');
        },
        error: err => console.error('Error agregando producto:', err)
      });
    } else {
      alert(this.isEditMode ? 'Catálogo actualizado correctamente' : 'Catálogo creado correctamente');
    }
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

  formatPrice(amount: number, currencyCode: string = 'PEN'): string {
    const formatted = new Intl.NumberFormat('es-PE', {
      style: 'currency',
      currency: currencyCode,
      minimumFractionDigits: 2
    }).format(amount);
    return formatted.replace('S/', 'S/.');
  }
}
