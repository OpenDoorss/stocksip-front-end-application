import { Component, OnInit } from '@angular/core';
import { CatalogService } from '../../services/catalog.service';
import { CatalogItem } from '../../model/catalog-item.entity';
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
import {EMPTY, Observable, of, switchMap, tap} from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';

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
    accountId: 0,
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
    unitPrice: number
  }[] = [];
  isEditMode = false;
  showError = false;
  pageTitle = '';
  prevName = '';

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
    private userService: UserService,
    private snackBar: MatSnackBar
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
        this.catalogItems = items as any;
      },
      error: err => console.error('Error loading items:', err)
    });
  }

  onSave(): void {
    if (!this.catalog.name.trim()) { this.showError = true; return; }
    this.showError = false;

    const currentUser = this.userService.getCurrentUser();
    const accountId   = currentUser?.account?.id;         // ← debes tener esto definido
    if (!accountId) { console.error('Cuenta sin ID'); return; }

    /* ----- 1) Crear o actualizar el catálogo ----- */
    let catalog$: Observable<Catalog>;

    if (!this.isEditMode) {
      // Crear nuevo catálogo: asigna accountId y publica false
      const newCatalog: Catalog = {
        ...this.catalog,
        accountId,
        dateCreated: new Date().toISOString(),
        isPublished: false
      };
      catalog$ = this.catalogService.createCatalog(newCatalog);
    } else {
      const nameChanged = this.catalog.name !== this.prevName;
      catalog$ = nameChanged
        ? this.catalogService.updateCatalogName(this.catalog.id, this.catalog.name.trim(), accountId)
        : of(this.catalog);
    }

    catalog$.pipe(
      switchMap((cat: Catalog) => {
        this.catalog = cat;                    // ← ahora tiene ID real
        const filled = Object.values(this.newProduct).some(v => v);
        if (!filled) return of(null);

        const valid = Object.values(this.newProduct).every(v => v);
        if (!valid) { this.showError = true; return EMPTY; }

        const newItem: CatalogItem = {
          id: uuidv4(),
          catalogId: this.catalog.id,
          dateAdded: new Date().toISOString(),
          name: this.newProduct.name,
          productType: this.newProduct.productType,
          brand: this.newProduct.brand,
          content: +this.newProduct.content,
          unitPrice: this.newProduct.price!
        };
        return this.catalogService.addCatalogItem(newItem).pipe(
          tap(item => this.catalogItems.push(item))
        );
      })
    ).subscribe({
      next: () => {
        this.resetForm();
        this.prevName  = this.catalog.name;
        this.isEditMode = true;               // ahora estamos en modo edición
        this.snackBar.open(
          'Catálogo guardado correctamente',
          'Cerrar',
          { duration: 4000 }
        );
      },
      error: (err: any) => console.error('Error en guardado:', err)
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

  formatPrice(amount: number, currencyCode: string = 'PEN'): string {
    const formatted = new Intl.NumberFormat('es-PE', {
      style: 'currency',
      currency: currencyCode,
      minimumFractionDigits: 2
    }).format(amount);
    return formatted.replace('S/', 'S/.');
  }
}
