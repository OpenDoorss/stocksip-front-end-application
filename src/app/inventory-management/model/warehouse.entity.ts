import {v4 as uuid} from 'uuid';

export class Warehouse {
  id: number;
  name: string;
  imageUrl: string;
  location: string;
  capacity: number;
  profileId: number;

  constructor() {
    this.id = 0;
    this.name = '';
    this.imageUrl = '';
    this.location = '';
    this.capacity = 0;
    this.profileId = 0;
  }
}
