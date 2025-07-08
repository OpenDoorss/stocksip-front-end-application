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
      'Are you sure you want to delete this product from the catalog?'
    );
    if (!confirmed) return;

    const deletedItem = this.catalogItems.find(item => item.id === id);
    if (!deletedItem) return;

    this.catalogService.deleteCatalogItem(id).subscribe({
      next: () => {
        this.catalogItems = this.catalogItems.filter(item => item.id !== id);
        this.dataSource.data = this.catalogItems;

        const snackRef = this.snackBar.open(
          'Product deleted',
          'Undo',
          { duration: 5000, panelClass: ['snackbar-error'] }
        );

        const undoSub = snackRef.onAction().subscribe(() => {
          this.catalogItems.unshift(deletedItem);
          this.dataSource.data = this.catalogItems;
          undoSub.unsubscribe();
        });
      },
      error: err => {
        console.error('Error deleting from backend:', err);
        this.snackBar.open(
          'Error deleting the product',
          'Close',
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
    const cat = this.catalog!;
    if (!cat.id) {
      this.snackBar.open(
        'Incomplete catalog. Cannot publish.',
        'Close',
        { duration: 4000 }
      );
      return;
    }

    this.catalogService.publishCatalog(cat.id).subscribe({
      next: (published) => {
        this.catalog = published;

        this.snackBar.open('Catalog published successfully', 'Close', {
          duration: 4000
        });
      },
      error: (err) => {
        console.error('Error publishing catalog:', err);
        this.snackBar.open('Error publishing the catalog', 'Close', {
          duration: 4000
        });
      }
    });
  }
}
