export class Warehouse {
  warehouseId: number;
  name: string;
  imageUrl: string;
  street: string;
  city: string;
  district: string;
  postalCode: string;
  country: string;
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
    this.capacity = 0;
    this.profileId = 0;
  }
}
