import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Report } from '../../model/report.entity';


@Component({
  selector: 'app-report-item',
  imports: [CommonModule],
  templateUrl: './report-item.component.html',
  styleUrl: './report-item.component.css'
})
export class ReportItemComponent {
  @Input() report!: Report;
}
