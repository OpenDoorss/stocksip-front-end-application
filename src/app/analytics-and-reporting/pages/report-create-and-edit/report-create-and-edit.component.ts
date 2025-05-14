import { Component, OnInit } from '@angular/core';
import jsPDF from 'jspdf';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroupDirective, NgForm, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ErrorStateMatcher, provideNativeDateAdapter } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { LanguageSwitcherComponent } from '../../../public/components/language-switcher/language-switcher.component';
import { TranslatePipe } from '@ngx-translate/core';
import { Report } from '../../model/report.entity';
import { ReportService } from '../../services/report.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-report-create-and-edit',
  imports: [TranslatePipe, CommonModule, MatButtonModule, MatSelectModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatIconModule, FormsModule, ReactiveFormsModule],
  templateUrl: './report-create-and-edit.component.html',
  styleUrl: './report-create-and-edit.component.css'
})
export class ReportCreateAndEditComponent implements OnInit {
  reports: Report[] = [];

  constructor(private reportService: ReportService) {}

  ngOnInit(): void {
    this.loadReports();
  }

  private loadReports(): void {
    this.reportService.getAll().subscribe({
      next: (data) => {
        this.reports = data;
        console.log('Reports loaded:', this.reports);
      },
      error: (error) => {
        console.error('Error loading reports:', error);
      }
    });
  }
  private formatDate(date: Date): string {
    return formatDate(date, 'yyyy/MM/dd', 'en-US');
  }


  private addTableHeaders(doc: jsPDF, y: number): void {
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    
    const headers = [
      { text: 'Producto', x: 20, width: 40 },
      { text: 'Tipo', x: 65, width: 30 },
      { text: 'Precio (S/.)', x: 100, width: 30 },
      { text: 'Cantidad', x: 135, width: 30 },
      { text: 'Pérdida (S/.)', x: 170, width: 30 }
    ];
    
    headers.forEach(h => doc.text(h.text, h.x, y));
    doc.line(20, y + 3, 190, y + 3);
    doc.setFont('helvetica', 'normal');
  }

  private addReportRow(doc: jsPDF, report: Report, y: number): void {
    if (!report) return;
    
    doc.text(report.products?.substring(0, 20) || '-', 20, y);
    doc.text(report.type?.substring(0, 15) || '-', 65, y);
    doc.text(report.price?.toFixed(2).toString() || '0.00', 100, y);
    doc.text(report.amount?.toString() || '0', 135, y);
    doc.text(report.lost?.toFixed(2).toString() || '0.00', 170, y);
  }

  onGenerateReport(): void {
    if (!this.reports || this.reports.length === 0) {
      console.warn('No hay datos para generar el reporte');
      return;
    }

    try {
      const doc = new jsPDF();
      doc.setFont('helvetica');

      doc.setFontSize(16);
      doc.setFont('helvetica', 'bold');
      doc.text('REPORTE DE PRODUCTOS', 105, 20, { align: 'center' });
      doc.line(20, 25, 190, 25);

      doc.setFontSize(11);
      doc.setFont('helvetica', 'normal');
      doc.text(`Fecha del reporte: ${this.formatDate(new Date())}`, 20, 35);
      doc.text(`Total de registros: ${this.reports.length}`, 20, 42);
      doc.text('LISTA DE REPORTES:', 20, 50);

      this.addTableHeaders(doc, 60);
      let yPos = 70;
      doc.setFontSize(9);

      this.reports.forEach((report, index) => {
        if (yPos > 250) {
          doc.addPage();
          this.addTableHeaders(doc, 20);
          yPos = 30;
        }
        this.addReportRow(doc, report, yPos);
        yPos += 7;

        if (index < this.reports.length - 1) {
          doc.setDrawColor(200, 200, 200);
          doc.line(20, yPos - 2, 190, yPos - 2);
          doc.setDrawColor(0);
        }
      });

      const totales = this.reports.reduce((acc, report) => ({
        productos: acc.productos + (report.amount || 0),
        perdida: acc.perdida + (report.lost || 0)
      }), { productos: 0, perdida: 0 });

      yPos += 5;
      doc.line(20, yPos, 190, yPos);
      yPos += 10;
      doc.setFontSize(11);
      doc.setFont('helvetica', 'bold');
      doc.text(`Total de Productos: ${totales.productos.toLocaleString()}`, 20, yPos);
      doc.text(`Pérdida Total: S/. ${totales.perdida.toFixed(2)}`, 120, yPos);

      doc.setFontSize(9);
      doc.setFont('helvetica', 'normal');
      doc.text('Generado por StockSip', 105, 280, { align: 'center' });
      doc.text(this.formatDate(new Date()), 105, 285, { align: 'center' });

      doc.save(`reporte-productos-${this.formatDate(new Date())}.pdf`);
      console.log('Reporte generado exitosamente');
    } catch (error) {
      console.error('Error al generar el reporte:', error);
    }
  }
}
