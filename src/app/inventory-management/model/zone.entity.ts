import {v4 as uuid } from 'uuid';

/**
 * Represents a Zone in the system. A Zone is like an inventory assigned to different locations in the liquor store.
 */
export class Zone {
  id: string;
  name: string;
  description: string;

  constructor(zone: {
    name: string,
    description: string
  }) {
    this.id = uuid();
    this.name = zone.name || '';
    this.description = zone.description || '';
  }
}
