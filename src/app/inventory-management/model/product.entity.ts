import {v4 as uuid } from 'uuid';
import {Money} from '../../shared/model/money';
import {DateTime} from '../../shared/model/date-time';

/**
 * Represents the State of the Product.
 */
export type ProductState = "IN-INVENTORY" | "BOUGHT" | "DONATED" | "LOST" | "CONSUMED";

/**
 * Represents the Type of the Product.
 */
const ProductTypes: string[] = ["RUM", "WHISKY", "GIN", "VODKA", "TEQUILA", "COGNAC", "BRANDY", "CREAMY", "HERBAL", "FRUIT", "SPECIAL"]

/**
 * Represents a Product in the system.
 */
export class Product {
  id: string;
  name: string;
  unitPrice: Money | null;
  content: number; // Amount of milliliters of the product.
  expirationDate: DateTime;
  productType: string;
  currentStock: number;
  minimumStock: number; // Minimum of stock that this product can have before sending an alert.
  state: ProductState; // State of product, it can change in future for the product movement
  providerId: string;

  /**
   * Creates a new Product instance.
   * @param product {Product} - The Object that contains the data to create the Product instance.
   */
  constructor(product: {
    name?: string,
    unitPrice?: Money,
    content?: number,
    expirationDate?: DateTime,
    productType?: string,
    currentStock?: number,
    minimumStock?: number,
    providerId?: string
  }) {

    // Validation
    if (!product.providerId || product.providerId.trim() === "") {
      throw new Error("Provider ID cannot be empty");
    }

    // @ts-ignore
    if (!(product.content > 0)) {
      throw new Error("Product content must be non-negative or not null.");
    }

    // @ts-ignore
    if (product.currentStock <= 0) {
      throw new Error("Product current stock must be non-negative or not null.");
    }

    // @ts-ignore
    if (product.minimumStock <= 0) {
      throw new Error("Product minimum stock must be non-negative or not null.");
    }

    if (!(ProductTypes.includes(<string>product.productType))) {
      throw new Error("Product current stock must be non-negative or not null.");
    }

    this.id = uuid();
    this.name = product.name || '';
    this.unitPrice = product.unitPrice || null;
    this.content = product.content || 0;
    this.expirationDate = product.expirationDate || new DateTime();
    this.productType = product.productType || '';
    this.currentStock = product.currentStock || 0;
    this.minimumStock = product.minimumStock || 5;
    this.state = 'IN-INVENTORY';
    this.providerId = product.providerId || '';
  }

  // METHODS

  /**
   * Method to update the basic info of the Product
   * @param name {string} - Name of the product
   * @param unitPrice {Money} - Unit price of the product
   * @param content {number} - The amount of milliliters of content of the product.
   */
  public updateInfo(name: string, unitPrice: Money, content: number): void {
    if (!(name.trim() === '')) {
      this.name = name;
    } else {
      throw new Error("Product name cannot be empty.")
    }

    if (content && content > 0) {
      this.content = content;
    } else {
      throw new Error("Product content must be non-negative or not null.");
    }

    if (unitPrice && unitPrice.amount > 0) {
      this.unitPrice = unitPrice;
    } else {
      throw new Error("Product unit price must be non-negative or not null.");
    }
  }

  /**
   * Method to update
   * @param type
   */
  public updateType(type: string): void {
    if (!(type.trim() === '') && ProductTypes.includes(<string>type)) {
      this.productType = type;
    } else {
      throw new Error("Product type cannot be empty.");
    }
  }

  public setMinimumStock(minimumStock: number): void {
    if (minimumStock && minimumStock > 0) {
      this.minimumStock = minimumStock;
    } else {
      throw new Error("Invalid minimum stock.");
    }
  }

  public alterCurrentStock(stock: number): void {
    if (stock && stock > 0 && stock >= this.currentStock) {
      this.currentStock = this.minimumStock - stock;
    } else {
      throw new Error("Invalid stock number.");
    }
  }

  public getName(): string {
    return this.name;
  }

  public getProductType(): string {
    return this.productType;
  }

  public getUnitPrice(): Money | null {
    return this.unitPrice;
  }

  public getProductContent() : number {
    return this.content;
  }

  public getExpirationDate(): DateTime {
    return this.expirationDate;
  }

  public getCurrentStock(): number {
    return this.currentStock;
  }

  public getMinimumStock(): number {
    return this.minimumStock;
  }

  public getProviderID(): string {
    return this.providerId;
  }

  /**
   * Transitions the product state to the BOUGHT state.
   */
  public purchase(): void {
    if (this.state === "IN-INVENTORY") {
      this.state = "BOUGHT";
    } else {
      throw new Error("Product can only change to this state from the state: 'IM-INVENTORY');'");
    }
  }

  /**
   * Transitions the product state to the DONATED state.
   */
  public donate(): void {
    if (this.state === "IN-INVENTORY") {
      this.state = "DONATED";
    } else {
      throw new Error("Product can only change to this state from the state: 'IM-INVENTORY');'");
    }
  }

  /**
   * Transitions the product state to the LOST state.
   */
  public lose(): void {
    if (this.state === "IN-INVENTORY") {
      this.state = "LOST";
    } else {
      throw new Error("Product can only change to this state from the state: 'IM-INVENTORY');'");
    }
  }

  /**
   * Transitions the product state to the CONSUMED state.
   */
  public consume(): void {
    if (this.state === "IN-INVENTORY") {
      this.state = "CONSUMED";
    } else {
      throw new Error("Product can only change to this state from the state: 'IM-INVENTORY');'");
    }
  }

  /**
   * This method determines if the product can be modified.
   * @private
   */
  private canModifyProduct(): boolean {
    return (this.state === "IN-INVENTORY");
  }
}
