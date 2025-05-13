import { Zone } from './zone.entity';
import {Product} from './product.entity';
import {v4 as uuid } from 'uuid';

const AlertsLevel: string[] = ["Critical", "Risky", "Normal"]

/**
 * Represents an Inventory in the system.
 */
export class Inventory {
  id: string;
  zone: Zone;
  totalQuantity: number;
  alertLevel: string;
  products: Array<Product>;
  profileId: string;

  /**
   * Creates a new Inventory instance.
   * @param inventory {Inventory} - The Object that contains the data to create the Inventory instance.
   */
  constructor(inventory: {
    zone: Zone;
    totalQuantity: number;
    products: Array<Product>;
    profileId: string;
  }) {

    // Validation
    if (inventory.totalQuantity < 0) {
      throw new Error('Inventory cannot have a negative quantity of products.');
    }

    this.id = uuid();
    this.zone = inventory.zone;
    this.totalQuantity = inventory.totalQuantity;
    this.alertLevel = "Normal";
    this.products = inventory.products || [];
    this.profileId = inventory.profileId;
  }
}
