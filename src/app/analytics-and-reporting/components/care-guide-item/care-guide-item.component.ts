import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import {CareGuide} from '../../model/care-guide.entity';
import { CareGuideService } from '../../services/care-guide.service';

@Component({
  selector: 'app-care-guide-item',
  imports: [CommonModule],
  templateUrl: './care-guide-item.component.html',
  styleUrl: './care-guide-item.component.css'
})

export class CareGuideItemComponent implements OnInit {
  @Input() guide?: CareGuide;
  guides: CareGuide[] = [];

  constructor(private careGuideService: CareGuideService) {}

  ngOnInit(): void {
    this.loadGuides();
  }

  private loadGuides(): void {
    this.careGuideService.getAllReport().subscribe({
      next: (data: CareGuide[]) => {
        this.guides = data;
        console.log('Guides loaded:', this.guides);
      },
      error: (err: any) => console.error('Error loading guides:', err)
    });
  }
}
