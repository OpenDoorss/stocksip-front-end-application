import {AfterViewInit, Component, inject, OnInit, ViewChild} from '@angular/core';
import {Zone} from '../../model/zone.entity';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort, MatSortHeader} from '@angular/material/sort';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable,
  MatTableDataSource
} from '@angular/material/table';
import {ZoneService} from '../../services/zone.service';
import {MatButton, MatFabButton} from '@angular/material/button';

@Component({
  selector: 'app-zones',
  imports: [
    MatTable,
    MatSort,
    MatPaginator,
    MatColumnDef,
    MatHeaderCell,
    MatSortHeader,
    MatCell,
    MatCellDef,
    MatHeaderCellDef,
    MatRowDef,
    MatHeaderRowDef,
    MatHeaderRow,
    MatRow,
    MatFabButton,
    MatButton,
  ],
  templateUrl: './zones.component.html',
  styleUrl: './zones.component.css'
})
export class ZonesComponent implements OnInit, AfterViewInit {

  //#region Attributes

  /** Current zone being viewed or edited */
  protected zoneData!: Zone;

  /** Defines which columns should be displayed in the table and their order */
  protected columnsToDisplay: string[] = ['zoneId', 'name', 'type', 'description', 'actions'];

  /** Reference to the Material paginator for handling page-based data display */
  @ViewChild(MatPaginator, {static: false})
  protected paginator!: MatPaginator;

  /** Reference to the Material sort directive for handling column sorting */
  @ViewChild(MatSort)
  protected sort!: MatSort;

  /** Material table data source for managing and displaying zone data */
  protected dataSource!: MatTableDataSource<any>;

  /** Service for handling zone-related API operations */
  private zoneService: ZoneService = inject(ZoneService);

  //#endregion

  //#region Methods

  /**
   * Initializes the component with default values and creates a new data source
   */
  constructor() {
    this.zoneData = new Zone({});
    this.dataSource = new MatTableDataSource();
  }

  /**
   * Lifecycle hook that runs after view initialization.
   * Sets up the Material table's paginator and sort functionality.
   */
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  /**
   * Lifecycle hook that runs on component initialization.
   * Loads the initial zone data.
   */
  ngOnInit(): void {
    this.getAllZones();
  }

  /**
   * Handles the view action for a zone
   * @param item - The zone to be viewed
   */
  protected onViewItem(item: Zone) {
    this.zoneData = item;
    // Add your view logic here
  }

  /**
   * Handles the edit action for a zone
   * @param item - The zone to be edited
   */
  protected onEditItem(item: Zone) {
    this.zoneData = item;
    // Add your edit logic here
  }

  /**
   * Handles the delete action for a zone
   * @param item - The zone to be deleted
   */
  protected onDeleteItem(item: Zone) {
    this.deleteZone(item.zoneId);
  }

  /**
   * Retrieves all zones from the service and updates the table's data source.
   * Uses ZoneService to fetch the data via HTTP.
   */
  private getAllZones() {
    this.zoneService.getAll().subscribe({
      next: (response: Array<Zone>) => {
        this.dataSource.data = response;
      },
      error: (err) => console.error('Error fetching zones:', err)
    });
  }

  /**
   * Creates a new zone using the ZoneService.
   * Updates the table's data source with the newly created zone.
   */
  private createZone() {
    this.zoneService.create(this.zoneData).subscribe({
      next: (response: Zone) => {
        this.dataSource.data = [...this.dataSource.data, response];
      },
      error: (err) => console.error('Error creating zone:', err)
    });
  }

  /**
   * Updates an existing zone using the ZoneService.
   * Updates the corresponding zone in the table's data source.
   */
  private updateZone() {
    this.zoneService.update(this.zoneData.zoneId, this.zoneData).subscribe({
      next: (response: Zone) => {
        const index = this.dataSource.data.findIndex(z => z.zoneId === response.zoneId);
        if (index > -1) {
          const updatedData = [...this.dataSource.data];
          updatedData[index] = response;
          this.dataSource.data = updatedData;
        }
      },
      error: (err) => console.error('Error updating zone:', err)
    });
  }

  /**
   * Deletes a zone using the ZoneService.
   * Removes the zone from the table's data source.
   * @param id - The ID of the zone to delete
   */
  private deleteZone(id: string) {
    this.zoneService.delete(id).subscribe({
      next: () => {
        this.dataSource.data = this.dataSource.data.filter(zone => zone.zoneId !== id);
      },
      error: (err) => console.error('Error deleting zone:', err)
    });
  }

  //#endregion
}
