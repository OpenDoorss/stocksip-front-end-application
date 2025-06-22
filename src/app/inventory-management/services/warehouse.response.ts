export interface WarehouseResource {
  warehouseId: number;
  name: string;
  imageUrl: string;
  street: string;
  city: string;
  district: string;
  country: string;
  postalCode: string;
  maxTemperature: number;
  minTemperature: number;
  capacity: number;
  profileId: number;
}
