import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {BaseService} from '../../shared/services/base.service';
import {Product} from '../model/product.entity';
import {catchError, map, Observable, tap} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {ProductResource} from './product.response';
import {ProductAssembler} from './product.assembler';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = environment.baseServerUrl;
  private productsEndpoint = environment.productsEndpointPath;

  constructor(private http: HttpClient) {
  }


  getProductsByAccountId(accountId: number): Observable<Product[]> {
    const url = `${this.apiUrl}/accounts/${accountId}/products`;
    return this.http.get<ProductResource[]>(url).pipe(
      map(resources => ProductAssembler.toEntitiesFromResources(resources)),
      catchError(error => {
        console.error('Error fetching products from API:', error);
        throw error;
      })
    );
  }



  createProductId(product: Product, imageFile: File): Observable<Product> {
    const formData = this.createFormData(product, imageFile);

    return this.http.post<Product>(
      `${this.apiUrl}${this.productsEndpoint}`,
      formData
    ).pipe(
      map(resource => ProductAssembler.toEntityFromResource(resource))
    );
  }

  private createFormData(product: Product, imageFile: File): FormData {
    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('liquorType', product.productType);
    formData.append('brandName', product.productBrand);
    formData.append('unitPriceAmount', product.unitPrice.toString());
    formData.append('minimumStock', product.minimumStock.toString());
    if (imageFile) {
      formData.append('image', imageFile);
    }
    return formData;
  }

}

