import {WarehouseResource} from './warehouse.response';
import {Warehouse} from '../model/warehouse.entity';

export class WarehouseAssembler {

  static toEntityFromResource(resource: WarehouseResource): Warehouse {
    return {
      warehouseId: resource.warehouseId,
      name: resource.name,
      imageUrl: resource.imageUrl,
      location: resource.location,
      city: resource.city,
      state: resource.state,
      postalCode: resource.postalCode,
      capacity: resource.capacity,
      profileId: resource.profileId
    }
  }

  static toEntitiesFromResources(resources: WarehouseResource[]): Warehouse[] {
    return resources.map(resource => this.toEntityFromResource(resource));
  }
}
