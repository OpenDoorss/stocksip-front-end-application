import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart, registerables } from 'chart.js';
import {
  MatCardModule
} from '@angular/material/card';
import {
  MatTableModule
} from '@angular/material/table';
import {
  MatFormFieldModule
} from '@angular/material/form-field';
import {
  MatSelectModule
} from '@angular/material/select';
import {
  MatOptionModule
} from '@angular/material/core';
import {MatButton} from '@angular/material/button';
import {RouterLink} from '@angular/router';
import {SideNavbarComponent} from '../../../public/components/side-navbar/side-navbar.component';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    MatTableModule,
    MatButton,
    RouterLink,
    SideNavbarComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements AfterViewInit {
  @ViewChild('chartHighRotation') chartHighRotation!: ElementRef<HTMLCanvasElement>;
  @ViewChild('chartLowRotation') chartLowRotation!: ElementRef<HTMLCanvasElement>;

  displayedColumns: string[] = ['name', 'type', 'expiration', 'stock', 'minStock', 'price'];
  products = [
    {
      name: 'Vino Tinto Malbec',
      type: 'Destilado',
      expiration: new Date('2024-04-24'),
      stock: 20,
      minStock: 20,
      price: 20
    },
    {
      name: 'Vino Blanco',
      type: 'Destilado',
      expiration: new Date('2024-04-23'),
      stock: 20,
      minStock: 15,
      price: 20
    }
  ];

  ngAfterViewInit(): void {
    this.renderChart(this.chartHighRotation.nativeElement, ['Producto A', 'Producto B', 'Producto C'], [70, 20, 10], ['#A5D6A7', '#EF9A9A', '#CE93D8']);
    this.renderChart(this.chartLowRotation.nativeElement, ['Producto X', 'Producto Y', 'Producto Z'], [70, 20, 10], ['#A5D6A7', '#EF9A9A', '#CE93D8']);
  }

  private renderChart(canvas: HTMLCanvasElement, labels: string[], data: number[], colors: string[]) {
    new Chart(canvas.getContext('2d')!, {
      type: 'bar',
      data: {
        labels,
        datasets: [{
          data,
          backgroundColor: colors,
          borderRadius: 8,
          borderSkipped: false
        }]
      },
      options: {
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (context) => `${context.parsed.y}%`
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: { callback: value => `${value}%` }
          }
        }
      }
    });
  }
}
