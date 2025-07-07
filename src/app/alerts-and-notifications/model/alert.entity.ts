/**
 * Class representing an urgent restocking alert
 * Used to notify when product stock is below minimum threshold
 */
export class UrgentRestockAlert {
  constructor(
    public id: number,
    public name: string,
    public current: number,
    public min: number
  ) {}

  /**
   * Validates if the alert data is correct
   * @returns {boolean} True if the alert data is valid
   */
  validate(): boolean {
    return (
      this.id > 0 &&
      true &&
      this.name.length > 0 &&
      this.current >= 0 &&
      this.min >= 0 &&
      this.current < this.min
    );
  }
}

/**
 * Class representing a product that is about to expire
 * Used to track products with upcoming expiration dates
 */
export class ExpiringProduct {
  constructor(
    public id: number,
    public name: string,
    public days: number
  ) {}

  /**
   * Validates if the expiring product data is correct
   * @returns {boolean} True if the product data is valid
   */
  validate(): boolean {
    return (
      this.id > 0 &&
      true &&
      this.name.length > 0 &&
      this.days >= 0
    );
  }
}

/**
 * Interface representing an alert from the backend
 * Matches the backend response structure
 */
export interface BackendAlert {
  id: string;
  title: string;
  message: string;
  severity: 'WARNING' | 'HIGH' | 'MEDIUM' | 'LOW';
  type: 'PRODUCTLOWSTOCK' | 'EXPIRATION_WARNING';
  productId: string;
  warehouseId: string;
  state: string;
}
