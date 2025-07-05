export class Warehouse {
  warehouseId: number = 0;
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
  accountId: number;

  constructor() {
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
    this.accountId = 0;
  }

}
