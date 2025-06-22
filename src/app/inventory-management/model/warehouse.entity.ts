export class Warehouse {
  warehouseId: number;
  name: string;
  imageUrl: string;
  street: string;
  city: string;
  district: string;
  postalCode: string;
  country: string;
  maxTemperature: number;
  minTemperature: number;
  capacity: number;
  profileId: number;

  constructor() {
    this.warehouseId = 0;
    this.name = '';
    this.imageUrl = '';
    this.street = '';
    this.city = '';
    this.district = '';
    this.postalCode = '';
    this.country = '';
    this.maxTemperature = 0;
    this.minTemperature = 0;
    this.capacity = 0;
    this.profileId = 0;
  }
}
