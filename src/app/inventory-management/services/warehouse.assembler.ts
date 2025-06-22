import {WarehouseResource} from './warehouse.response';
import {Warehouse} from '../model/warehouse.entity';

export class WarehouseAssembler {

  static toEntityFromResource(resource: WarehouseResource): Warehouse {
    return {
      warehouseId: resource.warehouseId,
      name: resource.name,
      imageUrl: resource.imageUrl,
      street: resource.street,
      city: resource.city,
      district: resource.district,
      postalCode: resource.postalCode,
      country: resource.country,
      maxTemperature: resource.maxTemperature,
      minTemperature: resource.minTemperature,
      capacity: resource.capacity,
      profileId: resource.profileId
    }
  }

  static toEntitiesFromResources(resources: WarehouseResource[]): Warehouse[] {
    return resources.map(resource => this.toEntityFromResource(resource));
  }
}
