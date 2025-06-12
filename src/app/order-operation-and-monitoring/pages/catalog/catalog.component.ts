import { Component } from '@angular/core';
import { CatalogItemComponent} from '../../components/catalog-item/catalog-item.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-catalog-component',
  standalone: true,
  imports: [
    CatalogItemComponent,
    MatButtonModule,
    MatCardModule
  ],
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent {}
