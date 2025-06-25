import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {
  MatTableDataSource,
  MatTableModule
} from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { DatePipe } from '@angular/common';
import { MatIcon } from '@angular/material/icon';

import { CatalogService } from '../../services/catalog.service';
import { CatalogItem } from '../../model/catalog-item.entity';
import { Catalog } from '../../model/catalog.entity';

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
    DatePipe,
    MatIcon,
    MatPaginator,
    MatSnackBarModule
  ]
})
export class CatalogItemComponent implements OnInit, OnChanges {
  @Input() catalog: Catalog | null = null;

  displayedColumns: string[] = [
    'name',
    'content',
    'type',
    'brand',
    'price',
    'actions'
  ];
  catalogItems: CatalogItem[] = [];
  dataSource = new MatTableDataSource<CatalogItem>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private catalogService: CatalogService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['catalog'] && this.catalog) {
      this.loadCatalogItems();
    }
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  loadCatalogItems(): void {
    if (!this.catalog) return;

    this.catalogService.getCatalogItems(this.catalog.id).subscribe({
      next: items => {
        this.catalogItems = items;
        this.dataSource.data = items;
      },
      error: err => console.error('Error loading catalog items:', err)
    });
  }

  deleteItem(id: string): void {
    const confirmed = window.confirm(
      '¿Estás seguro de que deseas eliminar este producto del catálogo?'
    );
    if (!confirmed) return;

    const deletedItem = this.catalogItems.find(item => item.id === id);
    if (!deletedItem) return;

    this.catalogService.deleteCatalogItem(id).subscribe({
      next: () => {
        this.catalogItems = this.catalogItems.filter(item => item.id !== id);
        this.dataSource.data = this.catalogItems;

        const snackRef = this.snackBar.open(
          'Producto eliminado',
          'Deshacer',
          { duration: 5000, panelClass: ['snackbar-error'] }
        );

        const undoSub = snackRef.onAction().subscribe(() => {
          this.catalogItems.unshift(deletedItem);
          this.dataSource.data = this.catalogItems;
          undoSub.unsubscribe();
        });
      },
      error: err => {
        console.error('Error al eliminar del backend:', err);
        this.snackBar.open(
          'Error al eliminar el producto',
          'Cerrar',
          { duration: 3000 }
        );
      }
    });
  }

  formatPrice(amount: number, currencyCode: string = 'PEN'): string {
    const formatted = new Intl.NumberFormat('es-PE', {
      style: 'currency',
      currency: currencyCode,
      minimumFractionDigits: 2
    }).format(amount);
    return formatted.replace('S/', 'S/.');
  }

  goToEdit(): void {
    if (this.catalog) {
      this.router.navigate(['/catalog/edit', this.catalog.id]);
    }
  }

  onPublish(): void {
    if (
      !this.catalog?.id ||
      !this.catalog.accountId ||
      !this.catalog.name ||
      !this.catalog.dateCreated
    ) {
      this.snackBar.open(
        'Catálogo incompleto. No se puede publicar.',
        'Cerrar',
        { duration: 4000 }
      );
      return;
    }

    const updatedCatalog: Catalog = {
      id: this.catalog.id,
      accountId: this.catalog.accountId,
      name: this.catalog.name,
      dateCreated: this.catalog.dateCreated,
      isPublished: true
    };

    this.catalogService.updateCatalog(updatedCatalog).subscribe({
      next: () => {
        this.snackBar.open(
          'Catálogo publicado con éxito',
          'Cerrar',
          { duration: 4000 }
        );
      },
      error: err => {
        console.error('Error al publicar catálogo:', err);
        this.snackBar.open(
          'Error al publicar el catálogo',
          'Cerrar',
          { duration: 4000 }
        );
      }
    });
  }
}
