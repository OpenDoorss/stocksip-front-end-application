import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Warehouse} from '../model/warehouse.entity';
import {map, Observable} from 'rxjs';
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
}
