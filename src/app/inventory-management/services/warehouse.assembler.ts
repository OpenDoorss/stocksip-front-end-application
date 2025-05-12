import {WarehouseResource} from './warehouse.response';
import {Warehouse} from '../model/warehouse.entity';

export class WarehouseAssembler {

  static toEntityFromResource(resource: WarehouseResource): Warehouse {
    return {
      id: resource.id,
      name: resource.name,
      imageUrl: resource.imageUrl,
      location: resource.location,
      capacity: resource.capacity,
      profileId: resource.profileId
    }
  }

  static toEntitiesFromResources(resources: WarehouseResource[]): Warehouse[] {
    return resources.map(resource => this.toEntityFromResource(resource));
  }
}
