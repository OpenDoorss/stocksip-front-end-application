import {v4 as uuid } from 'uuid';
import {Money} from '../../shared/model/money';
import {DateTime} from '../../shared/model/date-time';

const States: string[] = ["In-Inventory", "Bought", "Donated", "Lost", "Consumed-Internally"]

/**
 * Represents a Product in the system.
 */
export class Product {
  id: string;
  productInfo: {
    name: string;
    unitPrice: Money;
    content: number; // Amount of milliliters of the product.
    expirationDate: DateTime;
  };
  productType: string;
  currentStock: number;
  minimumStock: number; // Minimum of stock that this product can have before sending an alert.
  state: string; // State of product, it can change in future for the product movement
  providerId: string;

  /**
   * Creates a new Product instance.
   * @param product {Product} - The Object that contains the data to create the Product instance.
   */
  constructor(product: {
    productInfo: {
      name: string,
      unitPrice: Money,
      content: number,
      expirationDate: DateTime,
    },
    productType: string,
    currentStock: number,
    state: string,
    minimumStock: number,
    providerId: string
  }) {

    // Validation
    if (product.productInfo.content <= 0) {
      throw new Error("Product content must be non-negative or not null.");
    }

    if (product.currentStock <= 0) {
      throw new Error("Product current stock must be non-negative or not null.");
    }

    if (product.minimumStock <= 0) {
      throw new Error("Product minimum stock must be non-negative or not null.");
    }

    if (!(States.includes(product.state))) {
      throw new Error("Product state must be In-Inventory, Bought, Donated, Loose or Consumed-Internally.");
    }

    this.id = uuid();
    this.productInfo = product.productInfo || {};
    this.productType = product.productType || '';
    this.currentStock = product.currentStock || 0;
    this.minimumStock = product.minimumStock || 5;
    this.state = 'In-Inventory';
    this.providerId = product.providerId || '';
  }
}
