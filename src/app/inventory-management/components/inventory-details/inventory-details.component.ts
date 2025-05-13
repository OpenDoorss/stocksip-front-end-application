import {Component, inject, ViewChild} from '@angular/core';
import {Product} from '../../model/product.entity';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort, MatSortHeader} from '@angular/material/sort';
import {
  MatCell,
  MatCellDef,
  MatColumnDef, MatHeaderCell,
  MatHeaderCellDef, MatHeaderRow,
  MatHeaderRowDef, MatRow,
  MatRowDef,
  MatTable, MatTableDataSource
} from '@angular/material/table';
import {NgClass} from '@angular/common';
import {MatIcon} from '@angular/material/icon';
import {ProductService} from '../../services/product.service';
import {ToolbarContentComponent} from '../../../public/components/toolbar-content/toolbar-content.component';
import {ProductCreateAndEditComponent} from '../../pages/product-create-and-edit/product-create-and-edit.component';
import {Inventory} from '../../model/inventory.entity';

@Component({
  selector: 'app-inventory-details',
  imports: [
    MatTable,
    MatSort,
    MatHeaderCellDef,
    MatCellDef,
    MatHeaderRowDef,
    MatRowDef,
    MatPaginator,
    NgClass,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatRowDef,
    MatHeaderRow,
    MatRow,
    MatSortHeader,
    MatIcon,
    ToolbarContentComponent,
    ProductCreateAndEditComponent
  ],
  templateUrl: './inventory-details.component.html',
  styleUrl: './inventory-details.component.css'
})
export class InventoryDetailsComponent {

  pageTitle: string = 'Inventory';

  protected productData!: Product;

  protected columnsToDisplay: string[] = ['image', 'name', 'description', 'actions'];

  @ViewChild(MatPaginator, {static: false})
  protected paginator!: MatPaginator;

  @ViewChild(MatSort)
  protected sort!: MatSort;

  protected editMode: boolean = false;

  protected dataSource!: MatTableDataSource<Product>;

  private productService: ProductService = inject(ProductService);

  constructor() {
    this.editMode = false;

    this.productData = new Product({});
    this.dataSource = new MatTableDataSource();
    console.log(this.productData);
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.getAllProducts();
  }

  protected onEdition(item: Product) {
    this.editMode = true;
    this.productData = item;
  }

  protected onDeleteItem(item: Product) {
    this.deleteProduct(item.id);
  }

  protected onCancelRequested() {
    this.resetEditState();
    this.getAllProducts();
  }

  protected onProductAddRequested(item: Product) {
    this.productData = item;
    this.createProduct();
    this.resetEditState();
  }

  protected onProductUpdateRequested(item: Product) {
    this.productData = item;
    this.updateProduct();
    this.resetEditState();
  }

  private resetEditState(): void {
    this.productData = new Product({});
    this.editMode = false;
  }

  private getAllProducts(): void {
    this.productService.getAll().subscribe((response: Array<Product>) => {
      this.dataSource.data = response;
    })
  }

  private createProduct(): void {
    this.productService.create(this.productData).subscribe((response: Product) => {
      this.dataSource.data.push(response);
      this.dataSource.data = this.dataSource.data;
    })
  }

  private updateProduct(): void {
    let productToUpdate = this.productData;
    this.productService.update(productToUpdate.id, productToUpdate).subscribe((response: Product) => {
      let index = this.dataSource.data.findIndex((product: Product) => product.id === response.id);
      this.dataSource.data[index] = response;
      this.dataSource.data = this.dataSource.data;
    })
  }

  private deleteProduct(id: string): void {
    this.productService.delete(id).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter((product: Product) => product.id !== id);
    })
  }
}
