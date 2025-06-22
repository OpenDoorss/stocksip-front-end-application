import {WarehouseResource} from './warehouse.response';
import {Warehouse} from '../model/warehouse.entity';

export class WarehouseAssembler {

  static toEntityFromResource(resource: WarehouseResource): Warehouse {

    const warehouse = new Warehouse();

    warehouse.warehouseId = resource.warehouseId;
    warehouse.name = resource.name;
    warehouse.imageUrl = resource.imageUrl;
    warehouse.street = resource.street;
    warehouse.city = resource.city;
    warehouse.district = resource.district;
    warehouse.postalCode = resource.postalCode;
    warehouse.country = resource.country;
    warehouse.maxTemperature = resource.maxTemperature;
    warehouse.minTemperature = resource.minTemperature;
    warehouse.capacity = resource.capacity;
    warehouse.accountId = resource.accountId;

    return warehouse;
  }

  static toEntitiesFromResources(resources: WarehouseResource[]): Warehouse[] {
    return resources.map(resource => this.toEntityFromResource(resource));
  }
}
