import { Component } from '@angular/core';
import {MatCard, MatCardTitle} from '@angular/material/card';
import {MatDivider} from '@angular/material/divider';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-alerts-and-notifications',
  imports: [
    MatCard,
    MatCardTitle,
    MatDivider,
    NgForOf,
  ],
  templateUrl: './alerts.component.html',
  styleUrl: './alerts.component.css'
})

export class AlertsComponent {
  urgentRestockAlerts = [
    { name: 'Whisky Escocés Premium', current: 5, min: 10 },
    { name: 'Cerveza Artesanal IPA', current: 8, min: 12 },
    { name: 'Whisky Escocés Premium', current: 5, min: 10 },
  ];

  upcomingExpirations = [
    { name: 'Vino Tinto Malbec', days: 15 },
    { name: 'Gin Botánico', days: 10 },
    { name: 'Vino Blanco Malbec', days: 8 },
    { name: 'Vino Blanco Malbec', days: 8 },
  ];
}
