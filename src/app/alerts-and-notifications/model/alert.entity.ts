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
