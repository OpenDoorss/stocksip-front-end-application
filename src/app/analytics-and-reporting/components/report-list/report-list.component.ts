import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import jsPDF from 'jspdf';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroupDirective, NgForm, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ErrorStateMatcher, provideNativeDateAdapter } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { TranslatePipe } from '@ngx-translate/core';
import { ReportService } from '../../services/report.service';
import { Report } from '../../model/report.entity';
import { ReportItemComponent } from '../report-item/report-item.component';
import { formatDate } from '@angular/common';
import { ReportCreateAndEditComponent } from "../../pages/report-create-and-edit/report-create-and-edit.component";
import {ToolBarComponent} from '../../../public/components/tool-bar/tool-bar.component';
import {SideNavbarComponent} from '../../../public/components/side-navbar/side-navbar.component';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form?.submitted;
    return !!(control?.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-report-list',
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    TranslatePipe,
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    ReportItemComponent,
    ReportCreateAndEditComponent,
    ToolBarComponent,
    SideNavbarComponent
  ],
  providers: [provideNativeDateAdapter()],
})
export class ReportListComponent implements OnInit {
  searchTextProduct= '';
  searchTextType = '';
  searchTextPrices = '';
  searchTextTotal = '';
  Control = new FormControl('', [Validators.required, Validators.email]);
  matcher = new MyErrorStateMatcher();
  reports: Report[] = [];


  constructor(private router: Router, private reportService: ReportService) {}

  ngOnInit(): void {
    this.loadReports();
  }

  private loadReports(): void {
    this.reportService.getAllReport().subscribe({
      next: (data) => {
        this.reports = data;
        console.log('Reports loaded:', this.reports);
      },
      error: (error) => {
        console.error('Error loading reports:', error);
      }
    });
  }

  navigate(url: string): void {
    this.router.navigate([url]);
  }

  onSave(): void {
    const reportData: Report = {
      id: Date.now(),
      products: this.searchTextProduct || '',
      type: this.searchTextType || '',
      price: Number(this.searchTextPrices || '0'),
      amount: Number(this.searchTextTotal || '0'),
      date: this.formatDate(new Date()),
      lost: Number(this.Control.value || 0)
    };

    this.reportService.createReport(reportData).subscribe(
      (response) => {
        console.log('Report saved successfully:', response);
        this.loadReports();
        this.searchTextProduct = '';
        this.searchTextType = '';
        this.searchTextPrices = '';
        this.searchTextTotal = '';
        this.Control.reset();
      },
      (error) => {
        console.error('Error saving report:', error);
      }
    );
  }

  private formatDate(date: Date): string {
    return formatDate(date, 'yyyy/MM/dd', 'en-US');
  }

  onCancel(url: string): void {
    this.router.navigate([url]);
  }

  private addTableHeaders(doc: jsPDF, y: number): void {
    doc.setFontSize(11);
    const headers = [
      { text: 'Producto', x: 20 },
      { text: 'Tipo', x: 65 },
      { text: 'Precio (S/.)', x: 100 },
      { text: 'Cantidad', x: 135 },
      { text: 'Pérdida (S/.)', x: 170 }
    ];
    headers.forEach(h => doc.text(h.text, h.x, y));
    doc.line(20, y + 3, 190, y + 3);
  }

  private addReportRow(doc: jsPDF, report: Report, y: number): void {
    doc.text(report.products.substring(0, 20), 20, y);
    doc.text(report.type.substring(0, 15), 65, y);
    doc.text(report.price.toString(), 100, y);
    doc.text(report.amount.toString(), 135, y);
    doc.text(report.lost.toString(), 170, y);
  }
}
