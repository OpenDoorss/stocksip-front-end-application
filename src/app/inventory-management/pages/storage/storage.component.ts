import {Component, OnInit} from '@angular/core';
import {ProductService} from '../../services/product.service';
import {Product} from '../../model/product.entity';
import {ToolBarComponent} from '../../../public/components/tool-bar/tool-bar.component';
import {ProductListComponent} from '../../components/product-list/product-list.component';
import {MatButtonToggle} from '@angular/material/button-toggle';
import {MatIcon} from '@angular/material/icon';
import {NgIf} from '@angular/common';
import {Router} from '@angular/router';
import {SideNavbarComponent} from '../../../public/components/side-navbar/side-navbar.component';
import { ConfirmDeleteDialogComponent} from '../../../shared/components/confirm-dialog/confirm-dialog.component';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-storage',
  standalone: true,
  imports: [
    ToolBarComponent, ProductListComponent,
    NgIf,
    MatIcon,
    MatButtonToggle,
    SideNavbarComponent,
    MatDialogModule,
    MatButtonModule,
    ConfirmDeleteDialogComponent
  ],
  templateUrl: './storage.component.html',
  styleUrl: './storage.component.css'
})

export class StorageComponent implements OnInit {
  products: Product[] = [];

  constructor(private router: Router, private productService: ProductService, private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProductsByAccountId().subscribe({
      next: (products) => this.products = products,
      error: (err) => console.error('Error loading products:', err)
    });
  }

  goToCreateProduct() {
    this.router.navigate(['/product/new']);
  }

  onEditProduct(product: Product) {
    this.router.navigate(['/storage/products', product.id, 'edit']);
  }

  onDeleteProduct(productId: number) {
    const dialogRef = this.dialog.open(ConfirmDeleteDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.productService.deleteProduct(productId.toString()).subscribe({
          next: () => {
            this.products = this.products.filter(p => p.id !== productId);
            console.log('Product deleted');
          },
          error: err => {
            console.error('Failed to delete product:', err);
          }
        });
      }
    });
  }

}

