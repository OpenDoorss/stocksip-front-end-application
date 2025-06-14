import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import {Observable, map} from 'rxjs';
import { CatalogItem } from '../model/catalog-item.entity';
import {Catalog} from '../model/catalog.entity';
import {Money} from '../../shared/model/money';
import {Currency} from '../../shared/model/currency';


@Injectable({
  providedIn: 'root'
})
export class CatalogService {
  private apiUrl = environment.apiUrl;
  private catalogEndpoint = environment.catalogEndpointPath;

  constructor(private http: HttpClient) {
  }

  getCatalogByProfile(profileId: number): Observable<Catalog[]> {
    return this.http.get<Catalog[]>(`${this.apiUrl}/catalogs?profileId=${profileId}`);
  }

  getCatalogItems(catalogId: number): Observable<CatalogItem[]> {
    return this.http.get<any[]>(`${this.apiUrl}/catalogItems?catalogId=${catalogId}`).pipe(
      map((items: any[]) => {
        return items.map((item: any) => {
          const priceRaw = item.unitPrice;

          let money: Money;

          if (typeof priceRaw === 'number') {
            money = new Money(priceRaw, new Currency('PEN'));
          } else if (priceRaw && typeof priceRaw === 'object') {
            const amount = priceRaw._amount ?? priceRaw.amount ?? 0;
            const currencyCode = priceRaw._currency?._code ?? priceRaw.currency ?? 'PEN';
            money = new Money(amount, new Currency(currencyCode));
          } else {
            money = new Money(0, new Currency('PEN'));
          }

          return {
            ...item,
            unitPrice: money
          };
        });
      })
    );
  }

  addCatalogItem(item: CatalogItem): Observable<CatalogItem> {
    const plainItem = {
      ...item,
      unitPrice: {
        _amount: item.unitPrice.amount,
        _currency: {
          _code: item.unitPrice.currency.code
        }
      }
    };

    return this.http.post<CatalogItem>(`${this.apiUrl}/catalogItems`, plainItem);
  }

  getCatalogById(id: number): Observable<Catalog> {
    return this.http.get<Catalog>(`${this.apiUrl}/catalogs/${id}`);
  }

  updateCatalog(catalog: Catalog): Observable<Catalog> {
    return this.http.put<Catalog>(`${this.apiUrl}/catalogs/${catalog.id}`, catalog);
  }

  deleteCatalogItem(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/catalogItems/${id}`);
  }

  getPublishedCatalogs(): Observable<Catalog[]> {
    return this.http.get<Catalog[]>(`${this.apiUrl}/catalogs?isPublished=true`);
  }

  getPublishedCatalogsByProfile(profileId: number): Observable<Catalog[]> {
    return this.http.get<Catalog[]>(`${this.apiUrl}/catalogs?profileId=${profileId}&isPublished=true`);
  }

}
