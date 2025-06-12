export class Warehouse {
  warehouseId: number;
  name: string;
  imageUrl: string;
  location: string;
  city: string;
  state: string;
  postalCode: string;
  capacity: number;
  profileId: number;

  constructor() {
    this.warehouseId = 0;
    this.name = '';
    this.imageUrl = '';
    this.location = '';
    this.city = '';
    this.state = '';
    this.postalCode = '';
    this.capacity = 0;
    this.profileId = 0;
  }
}
