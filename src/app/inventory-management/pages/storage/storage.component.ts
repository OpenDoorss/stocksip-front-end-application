import {Component, OnInit} from '@angular/core';
import {SideNavbarComponent} from '../../../public/components/side-navbar/side-navbar.component';
import {ProductService} from '../../services/product.service';
import {Product} from '../../model/product.entity';
import {MatFabButton} from '@angular/material/button';
import {ToolBarComponent} from '../../../public/components/tool-bar/tool-bar.component';
import {ProductListComponent} from '../../components/product-list/product-list.component';

@Component({
  selector: 'app-storage',
  imports: [
    SideNavbarComponent,
    ToolBarComponent,
    ProductListComponent,
  ],
  templateUrl: './storage.component.html',
  styleUrl: './storage.component.css'
})

export class StorageComponent implements OnInit {
  products: Product[] = [];

  constructor(private productService: ProductService) {
  }

  ngOnInit(): void {
    const accountId = 1; // ← cambia esto por el ID de la cuenta actual
    this.loadProducts(accountId);
  }

  loadProducts(accountId: number): void {
    this.productService.getProductsByAccountId(accountId).subscribe({
      next: (data) => this.products = data,
      error: (err) => console.error('Error al cargar productos:', err)
    });
  }
}
