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
  private apiUrl = environment.backendApi;
  private productsEndpoint = environment.productsEndpointPath;

  constructor(private http: HttpClient) {
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<ProductResource[]>(`${this.apiUrl}${this.productsEndpoint}`).pipe(
      map(resources => ProductAssembler.toEntitiesFromResources(resources))
    );
  }

  getProductById(productId: string): Observable<Product> {
    return this.getProducts().pipe(
      map(products => products.find(p => p.productId === +productId)),
      map(warehouse => {
        if (!warehouse) {
          throw new Error('Product not found');
        }
        return warehouse;
      })
    );
  }

  createProductId(product: Product): Observable<Product> {
    return this.http.post<Product>(
      `${this.apiUrl}${this.productsEndpoint}`, ProductAssembler.toEntityFromResource(product)).pipe(
      map(resource => ProductAssembler.toEntityFromResource(resource))
    )
  }

  updateProduct(productId: string, product: Product): Observable<Product> {
    return this.http.put<Product>(
      `${this.apiUrl}${this.productsEndpoint}/${product.productId}`, ProductAssembler.toEntityFromResource(product)).pipe(
      map(resource => ProductAssembler.toEntityFromResource(resource))
    );
  }

  getProductsByAccountId(accountId: number): Observable<any[]> {
    console.log('Requesting products for profileId:', accountId);
    return this.http.get<any[]>(`${this.apiUrl}/products?providerId=${accountId}`).pipe(
      tap(data => console.log('Received products from API:', data)),
      catchError(error => {
        console.error('Error fetching products from API:', error);
        throw error;
      })
    );
  }
}

