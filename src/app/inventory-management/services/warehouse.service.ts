import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Warehouse} from '../model/warehouse.entity';
import {catchError, map, Observable, tap} from 'rxjs';
import {WarehouseAssembler} from './warehouse.assembler';
import {WarehouseResource} from './warehouse.response';

@Injectable({
  providedIn: 'root'
})
export class WarehouseService {
  private apiUrl = environment.apiUrl;
  private warehousesEndpoint = environment.warehousesEndpointPath;

  constructor(private http: HttpClient) {}

  getWarehouses(): Observable<Warehouse[]> {
    return this.http.get<WarehouseResource[]>(`${this.apiUrl}${this.warehousesEndpoint}`).pipe(
      map(resources => WarehouseAssembler.toEntitiesFromResources(resources))
    );
  }

  getWarehouseById(warehouseId: string): Observable<Warehouse> {
    return this.getWarehouses().pipe(
      map(warehouses => warehouses.find(w => w.warehouseId === +warehouseId)),
      map(warehouse => {
        if (!warehouse) {
          throw new Error('Warehouse not found');
        }
        return warehouse;
      })
    );
  }

  createWarehouse(warehouse: Warehouse): Observable<Warehouse> {
    return this.http.post<Warehouse>(
      `${this.apiUrl}${this.warehousesEndpoint}`, WarehouseAssembler.toEntityFromResource(warehouse)).pipe(
      map(resource => WarehouseAssembler.toEntityFromResource(resource))
    )
  }

  getWarehousesByProfile(profileId: number): Observable<any[]> {
    console.log('Requesting warehouses for profileId:', profileId);
    return this.http.get<any[]>(`${this.apiUrl}/warehouses?profileId=${profileId}`).pipe(
      tap(data => console.log('Received warehouses from API:', data)),
      catchError(error => {
        console.error('Error fetching warehouses from API:', error);
        throw error;
      })
    );
  }
}
